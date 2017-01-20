package com.rupp.timetrack.service;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import com.rupp.timetrack.dao.UserProfileDao;
import com.rupp.timetrack.domain.UserProfile;
import com.rupp.timetrack.utils.ValidationUtils;
import com.sma.security.service.AccessToken;
import com.sma.security.web.UserAccountController;
import com.sma.security.web.UserListener;

public class UserAccountListener implements UserListener {
    private static final Logger LOG = LoggerFactory.getLogger(UserAccountListener.class);

    private final ThreadLocal<UserProfile> userProfile = new ThreadLocal<>();
    @Autowired
    private UserProfileDao userProfileDao; 

    private String validateGenderValue(String gender) {
        
        if (StringUtils.isNotEmpty(gender)) {
            
            gender = StringUtils.capitalize(gender);
            //if (! Arrays.asList("Female","Male").contains(gender)) {
             //   BusinessError.INVALID_GENDER.throwException();
            //}
        }
        return gender;
    }
    public void preProcess(HttpServletRequest request, String actionName) {
        if (UserAccountController.ACTION_SIGNUP_NEW_USER.equals(actionName)) {
            String firstName = request.getParameter("firstName");
            String lastName = request.getParameter("lastName");
            String username = request.getParameter("username");
            String gender = validateGenderValue(request.getParameter("gender"));
            // validate fields request
            ValidationUtils.validateNotNull("Email Address", username);
            //ValidationUtils.validateNotNull("FirstName", firstName);
            //ValidationUtils.validateNotNull("LastName", lastName);

            // getCurrentSession
            final UserProfile profile = new UserProfile();
            profile.setEmail(username);
            profile.setFirstName(firstName);
            profile.setLastName(lastName);
            profile.setGender(gender);
            userProfile.set(profile);
        }
    }
    @Override
    public void afterProcess(HttpServletRequest request, Object response, String actionName) {
        if (UserAccountController.ACTION_SIGNUP_NEW_USER.equals(actionName)) {
            // Create user profile
            final AccessToken token = (AccessToken) response;
            final UserProfile profile = userProfile.get();
            profile.setUserId(token.getUserId());
            profile.setId(token.getUserId());
            
            userProfileDao.add(profile);
        }
    }
}
