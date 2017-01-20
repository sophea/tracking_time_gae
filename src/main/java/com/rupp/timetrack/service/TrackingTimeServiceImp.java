package com.rupp.timetrack.service;

import java.util.concurrent.TimeUnit;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import com.rupp.timetrack.config.MvcConfig;
import com.rupp.timetrack.dao.UserProfileDao;
import com.rupp.timetrack.domain.UserProfile;
import com.sma.security.domain.UserAccount;
import com.sma.security.service.AccessToken;
import com.sma.security.service.UserAccountServiceImpl;
import com.sma.security.service.UserSecurityService;
import com.sma.security.service.UserSecurityService.ExpirePolicy;

public class TrackingTimeServiceImp  {
    private static final Logger LOG = LoggerFactory.getLogger(TrackingTimeServiceImp.class);

    
    @Autowired
    private UserAccountServiceImpl userAccountService;
    
    @Autowired
    private UserSecurityService userSecurityService;
    
    @Autowired
    private UserProfileDao userProfileDao;
    
    public void init() {
        LOG.info("===================init Service============");
        try {
            if (MvcConfig.isGAEDevelopmentServerMode()) {

                userSecurityService.createSuperRootAdminAccount("admin", "admin", ExpirePolicy.AFTER_LOGIN,
                        TimeUnit.DAYS.toSeconds(1L));
                UserAccount parent = userAccountService.findByUsername("admin");

                /** create sample data test */
                for (int i = 1; i < 20; i++) {
                    String email = String.format("test+%s@gmail.com", i);
                    String pwd = "Aa12345678";
                    AccessToken token = userSecurityService.createNewUserNamePasswordAccount(email, pwd, parent, 1L, "en", "http://localhost:8080",
                            UserSecurityService.USER_TYPE_RESOURCE_PWD);
                    
                    // getCurrentSession
                    final UserProfile profile = new UserProfile();
                    profile.setEmail(email);
                    profile.setFirstName("firstName" + i);
                    profile.setLastName("lastName" + i);
                    profile.setUserId(token.getUserId());
                    profile.setId(token.getUserId());
                    userProfileDao.add(profile);
                }
            }
        } catch (Exception e) {
            LOG.error(e.getMessage(), e);
        }
    }
}