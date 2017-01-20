/***/
package com.rupp.timetrack.dao;

import java.util.Date;

import com.google.appengine.api.datastore.Entity;
import com.rupp.timetrack.domain.AbstractLongDomainEntity;
import com.sma.security.interceptor.SecurityModule;

/**
 * @author sophea <a href='mailto:sm@goldengekko.com'> sophea </a>
 * @version $id$ - $Revision$
 * @date 2014
 */
public abstract class GaeDaoImplHelper {
    
    public static String getCurrentUserId() {
        return SecurityModule.getCurrentSession().getUserAccountId() != null ? SecurityModule.getCurrentSession()
                .getUserAccountId().toString() : null;
    }

    public static <T extends AbstractLongDomainEntity> void copyDomainToEntity(T domain, Entity entity, boolean includeState,
            boolean includeVersion) {
        
        copyDomainToEntity(domain, entity);
        
        if (includeState) {
            entity.setProperty(AbstractLongDomainEntity.COLUMN_NAME_STATE, domain.getState());
            
        }
        if (includeVersion) {
            entity.setProperty(AbstractLongDomainEntity.COLUMN_NAME_VERSION, domain.getVersion());
        }
    }
    
    public static <T extends AbstractLongDomainEntity> void copyDomainToEntity(T domain, Entity entity) {
        entity.setProperty(AbstractLongDomainEntity.COLUMN_NAME_CREATEDBY, domain.getCreatedBy());
        entity.setProperty(AbstractLongDomainEntity.COLUMN_NAME_CREATEDDATE, domain.getCreatedDate());
        entity.setProperty(AbstractLongDomainEntity.COLUMN_NAME_UPDATEDDATE, domain.getUpdatedDate());
        entity.setProperty(AbstractLongDomainEntity.COLUMN_NAME_UPDATEDBY, domain.getUpdatedBy() );
    }

    public static <T extends AbstractLongDomainEntity> void copyEntityToDomain(Entity entity, T domain) {
        domain.setCreatedBy((String) entity.getProperty(AbstractLongDomainEntity.COLUMN_NAME_CREATEDBY));
        domain.setCreatedDate((Date) entity.getProperty(AbstractLongDomainEntity.COLUMN_NAME_CREATEDDATE));
        domain.setUpdatedBy((String) entity.getProperty(AbstractLongDomainEntity.COLUMN_NAME_UPDATEDBY));
        domain.setUpdatedDate((Date) entity.getProperty(AbstractLongDomainEntity.COLUMN_NAME_UPDATEDDATE));
        
        if (entity.hasProperty(AbstractLongDomainEntity.COLUMN_NAME_STATE)) {
            domain.setState((Long)entity.getProperty(AbstractLongDomainEntity.COLUMN_NAME_STATE));
        }
        if (entity.hasProperty(AbstractLongDomainEntity.COLUMN_NAME_VERSION)) {
            domain.setVersion((Long) entity.getProperty(AbstractLongDomainEntity.COLUMN_NAME_VERSION));
        }
    }
}
