package com.rupp.timetrack.service;

import java.util.Collection;
import java.util.Date;

import org.apache.commons.collections.CollectionUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.transaction.annotation.Transactional;

import com.rupp.timetrack.dao.GenericDao;
import com.rupp.timetrack.domain.AbstractLongDomainEntity;
import com.sma.common.BusinessException;
import com.sma.common.ObjectNotFoundException;
import com.sma.common.ObjectStateChangedSinceLastRequestException;
import com.sma.common.ResponseList;
import com.sma.security.domain.Session;
import com.sma.security.interceptor.SecurityModule;
import com.sma.security.web.Helper;

// @Service
public abstract class BaseService<T extends GenericDao<D>, D extends AbstractLongDomainEntity> {
    protected static final Logger LOG = LoggerFactory.getLogger(BaseService.class);
    protected T dao;
    private Class<D> domain;

    public BaseService(Class<D> domain) {
        this.domain = domain;
    }
    
    public abstract void setDao(T dao);

    public D findById(Long id) {
        LOG.debug(" findById : {}", id);
        return dao.findById( id);
    }

    public D findByPrimaryKey(Long id) {
        return findById(id);
    }

    public Iterable<D> findByPrimaryKeys(Collection<Long> ids) {
        return findByIds(ids);
    }

    public Iterable<D> findByIds(Collection<Long> ids) {
        LOG.debug(" findByIds : {}", ids);
        return dao.findByIds(ids);
    }

    @Transactional
    public void create(Iterable<D> domains) {
        for (D d : domains) {
            create(d);
        }
    }

    @Transactional
    public void update(Iterable<D> domains) {
            dao.update(domains);
    }

    @Transactional
    public D create(D domain) {
        final Date currentDate = new Date();
        final Session currentSession = SecurityModule.getCurrentSession();
        final String userId = currentSession == null || currentSession.getUserAccountId() == null ? null : currentSession
                .getUserAccountId().toString(); 
        domain.setCreatedBy(userId);
        domain.setCreatedDate(currentDate);
        domain.setUpdatedBy(userId);
        domain.setUpdatedDate(currentDate);
        domain.setVersion(1L);
        dao.add(domain);
        LOG.debug("domain created with new id {}", domain.getId());
        return domain;
    }

    public D createDomain() {
        try {
            return (D) domain.newInstance();
        } catch (InstantiationException e) {
            return null;
        } catch (IllegalAccessException e) {
            return null;
        }
    }

    @Transactional
    public void createOrUpdate(D domain) {
        // check id if not existed - create it
        if (domain.getId() == null) {
            dao.add(domain);
        } else {
            dao.update(domain);
        }
    }

    @Transactional
    public void update(D domain) {
        dao.update(domain);
    }
    @Transactional
    public void updateWithVersion(D entity, Long existingVersion) {

        if (entity == null) {
            throw new ObjectNotFoundException();
        }
        
        LOG.debug("update domain : check existing version : {}  new version : {} ", entity.getVersion(),
                existingVersion);
        
        
        if (entity.getVersion() != null && existingVersion != null && !entity.getVersion().equals(existingVersion)) {
            throw new ObjectStateChangedSinceLastRequestException(
                    "You are editing on an out-dated content. This is due to the content has changed by other user meanwhile. Please reload the page and re-modify.");
        }

        // auditfield
        if (existingVersion != null) {
            entity.setVersion(existingVersion + 1);
        }
        else {
            entity.setVersion(1L);
        }

        entity.setUpdatedBy(toString(Helper.getCurrentUserId()));
        entity.setUpdatedDate(new Date());
        dao.update(entity);
    }
    
    
    @Transactional
    public void update(D domain, Long id) {

        AbstractLongDomainEntity existingDomain = findById(id);

        if (existingDomain == null) {
            throw new ObjectNotFoundException();
        }
        LOG.debug("update domain : check existing version : {} domain version : {} ", existingDomain.getVersion(),
                domain.getVersion());
        if (existingDomain.getVersion() != null && !existingDomain.getVersion().equals(domain.getVersion())) {
            throw new ObjectStateChangedSinceLastRequestException("Object changed since last view");
        }
        if (existingDomain.getVersion() != null) {
            domain.setVersion(existingDomain.getVersion() + 1);
        }
        domain.setUpdatedBy(toString(Helper.getCurrentUserId()));
        domain.setUpdatedDate(new Date());
        domain.setCreatedBy(existingDomain.getCreatedBy());
        domain.setCreatedDate(existingDomain.getCreatedDate());
        domain.setId(id);
        dao.update(domain);
    }

    public Collection<D> getAll() {
        return dao.getAll();
    }

    /**
     * Remove the specific element
     * 
     * @param id
     */
    public void remove(long id) {
        LOG.debug(" remove : {}", id);
        dao.remove(id);
    }

    public int count() {
        return dao.count();
    }

    public int count(D domain) {
        return dao.countWithFilters(domain);
    }

    public ResponseList<D> getPage(int limit, String cursor) {
        LOG.debug(" getPage limit : {} cursor : {}", limit, cursor);
        return dao.getPage(limit, cursor);
    }

    public ResponseList<D> getPageWithFields(D domain, int pagesize, String cursorkey, String sortBy, boolean isAscending) {
        LOG.debug("getPageWithFields limit : {} cursor : {}", pagesize, cursorkey);

        return dao.getPageWithFields(domain, pagesize, cursorkey, sortBy, isAscending);
    }

    public T getDao() {
        return dao;
    }

    public Collection<D> findByFields(D domain) {
        return dao.findByFields(domain);
    }
    
    public D findOneByFields(D domain) {
        final Collection<D> list = dao.findByFields(domain);
        if (!CollectionUtils.isEmpty(list)) {
            if (list.size() > 1) {
                throw new BusinessException("found items more than one, expected result only one", 1);
            }
            //return only one
            return list.iterator().next();
        }
            
        return null;
    }

    @Transactional
    public void delete(Collection<D> domains) {
       dao.remove(domains);
    }

    
    @Transactional
    public void delete(Long id) {
        remove(id);
    }

    @Transactional
    public void delete(D domain) {
        remove(domain.getId());
    }
    
    public static String toString(Object from) {
        if (null == from) {
            return null;
        }
        return from.toString();
    }

}
