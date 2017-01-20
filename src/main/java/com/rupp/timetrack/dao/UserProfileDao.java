package com.rupp.timetrack.dao;

import java.util.Collection;

import com.rupp.timetrack.domain.UserProfile;


public interface UserProfileDao extends GenericDao<UserProfile> {

    UserProfile findByUserId(Long userId);
    Collection<UserProfile> findByUserIds(Collection<Long> userIds);
}
