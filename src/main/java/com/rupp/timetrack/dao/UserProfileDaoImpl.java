package com.rupp.timetrack.dao;

import java.util.Collection;
import java.util.Date;

import org.springframework.stereotype.Repository;

import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.Query.FilterOperator;
import com.rupp.timetrack.domain.UserProfile;
import com.sma.common.gaesupport.datastore.FilterDomain;

@Repository("userProfileDao")
public class UserProfileDaoImpl extends GenericDaoGAEImpl<UserProfile, Long> implements UserProfileDao {
    public static final String COLUMN_NAME_ID = "id";
    public static final String COLUMN_NAME_USERID = "userId";
    public static final String COLUMN_NAME_FIRSTNAME = "firstName";
    public static final String COLUMN_NAME_LASTNAME = "lastName";
    public static final String COLUMN_NAME_EMAIL = "email";
    public static final String COLUMN_NAME_GENDER = "gender";
    public static final String COLUMN_NAME_BIRTHOFYEAR = "birthOfYear";
    public static final String COLUMN_NAME_ADDRESS = "address";
    public static final String COLUMN_NAME_PHOTOURL = "photoUrl";
    public static final String COLUMN_NAME_EXTERNAL_ID = "externalId";
    protected UserProfileDaoImpl() {
        super(UserProfile.class, Long.class);
    }

    @Override
    public UserProfile findByUserId(Long userId) {

        final FilterDomain filter = new FilterDomain(COLUMN_NAME_USERID, FilterOperator.EQUAL, userId);
        return  findUniqueBy(filter);
    }
    @Override
    public Collection<UserProfile> findByUserIds(Collection<Long> userIds) {
        final FilterDomain filter = new FilterDomain(COLUMN_NAME_USERID, FilterOperator.IN, userIds);
        return queryList(filter);
    }
    @Override
    public String getPrimaryKeyColumnName() {
        return COLUMN_NAME_ID;
    }
    @Override
    public Long getSimpleKey(UserProfile profile) {
        return profile == null ? null : profile.getId();
    }

    @Override
    public void setSimpleKey(UserProfile profile, Long id) {
        profile.setId(id);
    }

    @Override
    protected void copyDomainToEntity(UserProfile domain, Entity entity) {
        populateEntityField(entity, COLUMN_NAME_USERID, domain.getUserId());
        populateEntityField(entity, COLUMN_NAME_FIRSTNAME, domain.getFirstName());
        populateEntityField(entity, COLUMN_NAME_LASTNAME, domain.getLastName());
        populateEntityField(entity, COLUMN_NAME_GENDER, domain.getGender());
        populateEntityField(entity, COLUMN_NAME_EMAIL, domain.getEmail());
        populateEntityField(entity, COLUMN_NAME_BIRTHOFYEAR, domain.getBirthOfYear());
        populateEntityField(entity, COLUMN_NAME_ADDRESS, domain.getAddress());
        populateEntityField(entity, COLUMN_NAME_PHOTOURL, domain.getPhotoUrl());
        populateEntityField(entity, COLUMN_NAME_EXTERNAL_ID, domain.getExternalId());
        GaeDaoImplHelper.copyDomainToEntity(domain, entity,false, true);
    }

    @Override
    protected void copyEntityToDomain(Entity entity, UserProfile domain) {
        domain.setUserId((Long) getCoreProperty(entity, COLUMN_NAME_USERID));
        domain.setFirstName((String) getCoreProperty(entity, COLUMN_NAME_FIRSTNAME));
        domain.setLastName((String) getCoreProperty(entity, COLUMN_NAME_LASTNAME));
        domain.setGender((String) getCoreProperty(entity, COLUMN_NAME_GENDER));
        domain.setEmail((String) getCoreProperty(entity, COLUMN_NAME_EMAIL));
        domain.setBirthOfYear((Date) getCoreProperty(entity, COLUMN_NAME_BIRTHOFYEAR));
        domain.setAddress((String) getCoreProperty(entity, COLUMN_NAME_ADDRESS));
        domain.setPhotoUrl((String) getCoreProperty(entity, COLUMN_NAME_PHOTOURL));
        domain.setExternalId((String) getCoreProperty(entity, COLUMN_NAME_EXTERNAL_ID));
        GaeDaoImplHelper.copyEntityToDomain(entity, domain);
    }

    @Override
    protected FilterDomain[] convert(UserProfile domain) {
        // TODO Auto-generated method stub
        return null;
    }
}
