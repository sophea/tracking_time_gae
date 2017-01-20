package com.rupp.timetrack.config;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.concurrent.TimeUnit;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.context.annotation.PropertySource;
import org.springframework.context.support.PropertySourcesPlaceholderConfigurer;
import org.springframework.core.env.Environment;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.ServletRequestBindingException;
import org.springframework.web.bind.UnsatisfiedServletRequestParameterException;
import org.springframework.web.servlet.HandlerExceptionResolver;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import org.springframework.web.servlet.view.InternalResourceView;
import org.springframework.web.servlet.view.InternalResourceViewResolver;

import com.fasterxml.jackson.databind.MapperFeature;
import com.google.appengine.api.utils.SystemProperty;
import com.rupp.timetrack.service.UserAccountListener;
import com.sma.common.gaesupport.web.BlobController;
import com.sma.common.web.RestJsonExceptionResolver;
import com.sma.common.web.SkipNullObjectMapper;
import com.sma.security.config.UserServiceGaeConfig;
import com.sma.security.interceptor.SecurityModule;
import com.sma.security.service.ClientCredentials;
import com.sma.security.service.ErrorValidation;
import com.sma.security.service.UserPasswordValidator;
import com.sma.security.service.UserSecurityService;
import com.sma.security.service.UserSecurityService.ExpirePolicy;
import com.sma.security.web.OAuth2Controller;
import com.sma.security.web.UserAccountController;

@Configuration
@EnableWebMvc
@Import(value = {UserServiceGaeConfig.class})
@PropertySource(name = "application", value = {"classpath:/application.properties"})
@ComponentScan(basePackages = { "com.rupp.timetrack.web" , "com.rupp.timetrack.service",
        "com.rupp.timetrack.dao", })
public class MvcConfig extends WebMvcConfigurerAdapter {

    public static final String ROLE_BRAND_ADMIN = "ROLE_BRAND_ADMIN";
    public static final String ROOT_ACCOUNT_EMAIL = "root@rupp.com";
    private static final String ROOT_ACCOUNT_PWD = "tVeQxsuazfAhGNgrd1PWua29f";

    @Autowired
    private Environment env;

    @Autowired
    protected UserAccountController userAccountController;

    @Autowired
    protected OAuth2Controller oAuth2Controller;

    @Autowired
    private UserSecurityService userSecurityService;


    // -------------- Services -----------------------

    // -------------- Message Converters ----------------------
    @Override
    public void configureMessageConverters(List<HttpMessageConverter<?>> converters) {

        final SkipNullObjectMapper skipNullMapper = new SkipNullObjectMapper();
        skipNullMapper.configure(MapperFeature.DEFAULT_VIEW_INCLUSION, false);
        final SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ssZ");
        skipNullMapper.setDateFormat(formatter);
        skipNullMapper.init();

        MappingJackson2HttpMessageConverter converter = new MappingJackson2HttpMessageConverter();
        converter.setObjectMapper(skipNullMapper);
        converters.add(converter);
    }


    // interceptors configured in interceptor-security.xml

    // -------------- Serving Resources ----------------------

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/**").addResourceLocations("/static/").addResourceLocations("classpath:/static/");
    }

    // replace-holder properties using @value annotation
    @Bean
    public static PropertySourcesPlaceholderConfigurer placeHolderConfigurer() {
        return new PropertySourcesPlaceholderConfigurer();
    }

    private String getProperty(String key) {
        return env.getProperty(key);
    }

    @Bean
    public BlobController blobController() {
        final BlobController blobController = new BlobController();
        return blobController;
    }
    // -------------- View Stuff -----------------------

    @Override
    public void configureHandlerExceptionResolvers(List<HandlerExceptionResolver> exceptionResolvers) {
        exceptionResolvers.add(restJsonExceptionResolver());
    }

    @Bean
    public RestJsonExceptionResolver restJsonExceptionResolver() {
        RestJsonExceptionResolver bean = new RestJsonExceptionResolver();
        RestJsonExceptionResolver.registerExceptionWithHTTPCode(org.springframework.beans.TypeMismatchException.class, 400);
        RestJsonExceptionResolver.registerExceptionWithHTTPCode(MissingServletRequestParameterException.class, 400);
        RestJsonExceptionResolver.registerExceptionWithHTTPCode(UnsatisfiedServletRequestParameterException.class, 400);
        RestJsonExceptionResolver.registerExceptionWithHTTPCode(org.springframework.beans.TypeMismatchException.class, 400);
        RestJsonExceptionResolver.registerExceptionWithHTTPCode(MissingServletRequestParameterException.class, 400);
        RestJsonExceptionResolver.registerExceptionWithHTTPCode(MethodArgumentNotValidException.class, 400);
        RestJsonExceptionResolver.registerExceptionWithHTTPCode(ServletRequestBindingException.class, 400);
        RestJsonExceptionResolver.registerExceptionWithHTTPCode(UnsatisfiedServletRequestParameterException.class, 400);

        // bean.setErrorIdGenerator(new GaeErrorIdGenerator());
        bean.setOrder(100);

        bean.setDiagnosticsDisabled(Boolean.parseBoolean(getProperty("json.diagnosticsDisabled")));
        //set general error message
        RestJsonExceptionResolver.setCustomMsg(getProperty("json.errormsg"));

        return bean;
    }

    @Bean
    public InternalResourceViewResolver htmlViewResolver() {
        final InternalResourceViewResolver bean = new InternalResourceViewResolver();
        bean.setViewClass(InternalResourceView.class);
        bean.setOrder(999);
        bean.setPrefix("/internal/");
        bean.setSuffix("");
        return bean;
    }

    // interceptors configured in interceptor-security.xml
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(securityModule()).addPathPatterns("/**");
    }
    //check gae is development server mode
    public static boolean isGAEDevelopmentServerMode() {
        return SystemProperty.Environment.Value.Development  == SystemProperty.environment.value();
    }
    @Bean
    public SecurityModule securityModuleBean() {
        return new SecurityModule();
    }
    private SecurityModule securityModule() {
        
        final SecurityModule securityModule = securityModuleBean();

        /** set sender fromEmail , fromName */
        securityModule.setFromEmailAndName(getProperty("email.from.address"), getProperty("email.from.name"));

        /** Override time boxed limit in minute and number of max request */
        SecurityModule.setRequestRateThrottleLimit(15, 300);
        //reset password timer 1d
        userSecurityService.setResetPwdExpirationTimerInMillis(UserSecurityService.MILLIS_ONE_DAY);
        /** set cookie in secure mode by default true */
        SecurityModule.setCookieSecure(Boolean.parseBoolean(getProperty("user.security.cookie.mode")));


        /**
         * custom user password valiation
         * Remove if you do not wish to have any custom password validation beyond the standard rules. This
         * serves only as an example.
         */
        securityModule.setUserPasswordValidator(new UserPasswordValidator() {

            @Override
            public List<ErrorValidation> validate(String password) {
                final List<ErrorValidation> errors = new ArrayList<>();

                boolean hasUppercase = !password.equals(password.toLowerCase());
                // boolean hasLowercase = !password.equals(password.toUpperCase());

                // password must contain an uppercase letter
                if (!hasUppercase) {
                    errors.add(new ErrorValidation(1, "password must contain an uppercase letter"));
                }

                if (StringUtils.length(password) < 8) {
                    errors.add(new ErrorValidation(1, "password must be at least 8 characters"));
                }
                return errors;
            }
        });

        // admin account will have ROLEs : ROLE_ADMIN , ROLE_BACKOFFICE_ADMIN,ROLE_USER
        userSecurityService.createSuperRootAdminAccount(ROOT_ACCOUNT_EMAIL, ROOT_ACCOUNT_PWD,
                ExpirePolicy.AFTER_LOGIN, 4L * 3600);

        // create client credentials 4hour
        List<ClientCredentials> clientCredentailsList = new LinkedList<>();
        // client type webapp 4hour
        clientCredentailsList.add(new ClientCredentials("webapp", "1h32o8ISSE0qiUWtdhXz3", ExpirePolicy.LAST_ACCESS, TimeUnit.HOURS
                .toSeconds(4L)));

        userSecurityService.createClientCredentials(clientCredentailsList);

        /** set deepLinkManager if you have extra fields in deepLink url */
        // userSecurityService.setDeepLinkManager(new DummyDeepLinkManager());

        /** add backend user listener and enable it, if not using this, remove this line away */
        // adminController.setListener(backendUserListenerBean);
        userAccountController.setListener(userAccountSignupListenerBean());
        
        /**
         * This flag is used for checking the process after creating new user account, 
         * It needs to activate account first by clicking from the mail box. 
         **/
        userSecurityService.setActivatedNewAccountEnable(false);

        return securityModule;
    }

    @Bean
    public UserAccountListener userAccountSignupListenerBean() {
        return new UserAccountListener();
    }
}
