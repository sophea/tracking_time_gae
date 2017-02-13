package com.rupp.timetrack.dao;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.Query.FilterOperator;
import com.rupp.timetrack.domain.TrackingTime;
import com.sma.common.gaesupport.datastore.FilterDomain;

@Repository("trackingTimeDao")
public class TrackingTimeDaoImpl extends GenericDaoGAEImpl<TrackingTime, Long> implements TrackingTimeDao {
    public static final String COLUMN_NAME_ID = "id";
    public static final String COLUMN_NAME_USERID = "userId";
    public static final String COLUMN_NAME_SUBJECT = "subject";
    public static final String COLUMN_NAME_DESCRIPTION = "description";
    public static final String COLUMN_NAME_HOURS = "hours";
    public static final String COLUMN_NAME_DATE = "date";
    public static final String COLUMN_NAME_DATETYPE = "dateType";
    public static final String COLUMN_NAME_FORMONTH = "forMonth";
    public static final String COLUMN_NAME_FORYEAR = "forYear";
    public static final String COLUMN_NAME_SUPERUSERID = "superUserId";
    public static final String COLUMN_NAME_SUPERCOMMENT = "superComment";
    protected TrackingTimeDaoImpl() {
        super(TrackingTime.class, Long.class);
    }

    public TrackingTime findByUserId(Long userId) {

        final FilterDomain filter = new FilterDomain(COLUMN_NAME_USERID, FilterOperator.EQUAL, userId);
        return  findUniqueBy(filter);
    }
    @Override
    public String getPrimaryKeyColumnName() {
        return COLUMN_NAME_ID;
    }
    @Override
    public Long getSimpleKey(TrackingTime profile) {
        return profile == null ? null : profile.getId();
    }

    @Override
    public void setSimpleKey(TrackingTime profile, Long id) {
        profile.setId(id);
    }

    @Override
    protected void copyDomainToEntity(TrackingTime domain, Entity entity) {
        populateEntityField(entity, COLUMN_NAME_USERID, domain.getUserId());
        populateEntityField(entity, COLUMN_NAME_SUBJECT, domain.getSubject());
        populateEntityField(entity, COLUMN_NAME_DESCRIPTION, domain.getDescription());
        populateEntityField(entity, COLUMN_NAME_HOURS, domain.getHours());
        populateEntityField(entity, COLUMN_NAME_DATE, domain.getDate());
        populateEntityField(entity, COLUMN_NAME_DATETYPE, domain.getDateType());
        populateEntityField(entity, COLUMN_NAME_FORMONTH, domain.getForMonth());
        populateEntityField(entity, COLUMN_NAME_FORYEAR, domain.getForYear());
        populateEntityField(entity, COLUMN_NAME_SUPERUSERID, domain.getSuperUserId());
        populateEntityField(entity, COLUMN_NAME_SUPERCOMMENT, domain.getSuperComment());
        GaeDaoImplHelper.copyDomainToEntity(domain, entity,true, true);
    }

    @Override
    protected void copyEntityToDomain(Entity entity, TrackingTime domain) {
        domain.setUserId((Long) getCoreProperty(entity, COLUMN_NAME_USERID));
        domain.setSubject((String) getCoreProperty(entity, COLUMN_NAME_SUBJECT));
        domain.setDescription((String) getCoreProperty(entity, COLUMN_NAME_DESCRIPTION));
        domain.setHours((Long) getCoreProperty(entity, COLUMN_NAME_HOURS));
        domain.setDate((Date) getCoreProperty(entity, COLUMN_NAME_DATE));
        domain.setDateType((String) getCoreProperty(entity, COLUMN_NAME_DATETYPE));
        domain.setForMonth((Long) getCoreProperty(entity, COLUMN_NAME_FORMONTH));
        domain.setForYear((Long) getCoreProperty(entity, COLUMN_NAME_FORYEAR));
        domain.setSuperUserId((Long) getCoreProperty(entity, COLUMN_NAME_SUPERUSERID));
        domain.setSuperComment((String) getCoreProperty(entity, COLUMN_NAME_SUPERCOMMENT));
        GaeDaoImplHelper.copyEntityToDomain(entity, domain);
    }

    @Override
    protected FilterDomain[] convert(TrackingTime domain) {
        final List<FilterDomain> filters = new ArrayList<FilterDomain>();

        if (domain == null) {
            return toArray(filters);
        }
        // state
        if (domain.getState() != null) {
            filters.add(createEqualsFilter(TrackingTime.COLUMN_NAME_STATE, domain.getState()));
        }
        //userid
        if (domain.getUserId() != null) {
            filters.add(createEqualsFilter(COLUMN_NAME_USERID, domain.getUserId()));
        }
        //forMonth
        if (domain.getForMonth() != null) {
            filters.add(createEqualsFilter(COLUMN_NAME_FORMONTH, domain.getForMonth()));
        }
        //forYear
        if (domain.getForYear() != null) {
            filters.add(createEqualsFilter(COLUMN_NAME_FORYEAR, domain.getForYear()));
        }
        
        return toArray(filters);
    }
}
