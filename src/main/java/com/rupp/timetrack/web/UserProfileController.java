/***/
package com.rupp.timetrack.web;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.rupp.timetrack.domain.UserProfile;
import com.rupp.timetrack.service.ProfileServiceImp;
import com.rupp.timetrack.utils.ValidationUtils;
import com.sma.security.annotation.Authorization;
import com.sma.security.interceptor.UserRole;
import com.sma.security.service.UserSecurityService;
import com.sma.security.web.Helper;
import com.wadpam.docrest.domain.RestCodes;
import com.wadpam.docrest.domain.RestReturn;

/**
 * <pre>
 * user profile controller : rest-api start  /api/profile request.
 * </pre>
 * 
 * @author sophea
 */
@RestReturn()
@Controller
@RequestMapping("profile")
public class UserProfileController {

    private static final Logger LOG = LoggerFactory.getLogger(UserProfileController.class);
    
    @Autowired
    private ProfileServiceImp profileService;
    
    @Autowired
    private UserSecurityService userSecurityService;

    /**
     * get current user profile
     * @param request
     */
    @RestReturn(highlightApiMessage = "get my profile : app-side",
            value = UserProfile.class, entity = UserProfile.class, codes = { @RestCodes(codes = "200,401,404,500") })
    @RequestMapping(value = "v1/me", method = { RequestMethod.GET })
    @Authorization(userRoles = {UserRole.ROLE_USER_PWD} )
    public ResponseEntity<UserProfile> getMyProfile(HttpServletRequest request) {
        UserProfile body = profileService.getProfileByUserId(Helper.getCurrentUserId(request));
        
        LOG.info(body.getEmail());
        
        return new ResponseEntity<>(body, HttpStatus.OK);
    }

    /**
     * update current user profile
     * @param userProfile : fields to send
     *          <pre>
     *        (mandatory)
                 firstName: 
                 lastName :
              (optional)
                 gender : F | M
                 address :
                 photoUrl :
                </pre>
     * @param request
     */
    @RestReturn(highlightApiMessage = "update my profile : app-side",
            value = UserProfile.class, entity = UserProfile.class, codes = { @RestCodes(codes = "200,401,404,500") })
    @RequestMapping(value = "v1/me", method = { RequestMethod.POST })
    @Authorization(userRoles = {UserRole.ROLE_USER_PWD} )
    public ResponseEntity<UserProfile> updateMyProfile(HttpServletRequest request, @ModelAttribute UserProfile userProfile) {
        
        final UserProfile body = profileService.getProfileByUserId(Helper.getCurrentUserId(request));
        
        ValidationUtils.validateNotNull("firstName", userProfile.getFirstName());
        ValidationUtils.validateNotNull("lastName", userProfile.getLastName());
        
        /**setter*/
        body.setFirstName(userProfile.getFirstName());
        body.setLastName(userProfile.getLastName());
        body.setGender(userProfile.getGender());
        body.setPhotoUrl(userProfile.getPhotoUrl());
        body.setAddress(userProfile.getAddress());
        
        /**check email*/
        if (StringUtils.isEmpty(body.getEmail())) {
            final String email = userSecurityService.getUserAccountDetails(body.getUserId()).getClientId();
            //email is not null
            if (email !=null ) {
                body.setEmail(email);
            }
        }
        /**updated state*/
        profileService.update(body);
        
        return new ResponseEntity<>(body, HttpStatus.OK);
    }
}
