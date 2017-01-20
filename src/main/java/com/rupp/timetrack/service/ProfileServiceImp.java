package com.rupp.timetrack.service;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rupp.timetrack.dao.UserProfileDao;
import com.rupp.timetrack.domain.UserProfile;
import com.sma.security.service.UserSecurityService;

@Service("profileService")
public class ProfileServiceImp  extends BaseService<UserProfileDao, UserProfile> {
    
    @Autowired
    private UserSecurityService userSecurityService;
    
    public ProfileServiceImp() {
        super(UserProfile.class);
    }
    
    public UserProfile getProfileByUserId(Long userId) {
        return dao.findByUserId(userId);
    }

    public Collection<UserProfile> findByUserIds(Collection<Long> userIds) {
        return dao.findByUserIds(userIds);
    }

    @Autowired
    public void setDao(UserProfileDao dao) {
        this.dao = dao;
    }
}
