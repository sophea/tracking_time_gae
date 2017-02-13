/***/
package com.rupp.timetrack.web;

import java.util.Collection;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.rupp.timetrack.domain.TrackingTime;
import com.rupp.timetrack.service.T3BackendServiceImp;
import com.rupp.timetrack.service.TrackingTimeServiceImp;
import com.rupp.timetrack.utils.ValidationUtils;
import com.sma.security.annotation.Authorization;
import com.sma.security.interceptor.UserRole;
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
@RequestMapping("trackingtime")
public class TrackingTimeController {

    private static final Logger LOG = LoggerFactory.getLogger(TrackingTimeController.class);
    
    @Autowired
    private TrackingTimeServiceImp trackingTimeServiceImp;
    
    /**
     * get my tracking
     * @param request
     */
    @RestReturn(highlightApiMessage = "get my Tracking times : app-side",
            value = TrackingTime.class, entity = TrackingTime.class, codes = { @RestCodes(codes = "200,401,404,500") })
    @RequestMapping(value = "v1/me", method = { RequestMethod.GET })
    @Authorization(userRoles = {UserRole.ROLE_USER_PWD} )
    public ResponseEntity<Collection<TrackingTime>> getMyTracking(HttpServletRequest request) {

        //TODOs : 
        final TrackingTime search = new TrackingTime();
        search.setUserId(Helper.getCurrentUserId(request));
        //get results
        return new ResponseEntity<>(trackingTimeServiceImp.findByFields(search), HttpStatus.OK);
    }

    /**
     * creating new record : userId is set current userLogin and state will be PENING mode
     * @param trackingTime : fields to send
     *          <pre>
     *        (mandatory)
                 subject:  java
                 hours : 3
                 date : yyyy-MM-dd
                 forMonth:  1
                 forYear: 2017
                 dateType: weekday or weekend
                 description :  ch01
                </pre>
     * @param request
     */
    @RestReturn(highlightApiMessage = "create Tracking Time record : app-side",
            value = TrackingTime.class, entity = TrackingTime.class, codes = { @RestCodes(codes = "200,401,404,500") })
    @RequestMapping(value = "v1", method = { RequestMethod.POST })
    @Authorization(userRoles = {UserRole.ROLE_USER_PWD} )
    public ResponseEntity<TrackingTime> createNewRecord(HttpServletRequest request, @ModelAttribute TrackingTime trackingTime) {
        
        LOG.debug("create new record");
        
        ValidationUtils.validateNotNull("subject", trackingTime.getSubject());
        //ValidationUtils.validateNotNull("hours", trackingTime.getHours());
        
        
        //userId :
        trackingTime.setUserId(Helper.getCurrentUserId(request));
        
        //set state
        trackingTime.setState(T3BackendServiceImp.PENDING);
        
        return new ResponseEntity<>(trackingTimeServiceImp.create(trackingTime), HttpStatus.OK);
    }
}
