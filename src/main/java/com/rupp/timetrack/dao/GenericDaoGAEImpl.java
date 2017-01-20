package com.rupp.timetrack.dao;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.List;

import org.apache.commons.collections.CollectionUtils;

import com.sma.common.ResponseList;
import com.sma.common.gaesupport.datastore.FilterDomain;
import com.sma.common.gaesupport.datastore.GaeDaoImpl;

public abstract class GenericDaoGAEImpl<T, ID extends Serializable> extends GaeDaoImpl<T, ID> 
implements GenericDao<T> {

    public GenericDaoGAEImpl(Class<T> type, Class<ID> idType) {
        super(type, idType);
    }
    protected abstract FilterDomain[] convert(T domain);

    @Override
    public T findById(Long id) {
        return findByPrimaryKey(null, (ID)id);
    }

    @Override
    public Long getLastModifyRecord(Date since) {
        // TODO Auto-generated method stub
        return super.getLastModifyRecord(since);
    }
    
    public Collection<T> findByIds(Collection ids) {
        return convert(queryByPrimaryKeys(null, ids));
    }

    @Override
    public void remove(Long id) {
        delete((ID) id);
    }
    @Override
    public void add(T domain) {
        persist(domain);
    }

    @Override
    public void add(Iterable<T> domains) {
        persist(domains);
    }

    @Override
    public Collection<T> getAll() {

        return convert(queryAll());
    }

    @Override
    public void remove(Iterable<T> domains) {
        delete(domains);
    }

    @Override
    public ResponseList<T> getPage(int limit, String cursor) {

        return queryPage(limit, cursor);
    }

    public static <T> Collection<T> convert(Iterable<T> from) {

        if (from == null) {
            return null;
        }

        if (from instanceof List || from instanceof ArrayList) {
            return (List) from;
        }

        List result = new ArrayList();
        for (Object item : from) {
            result.add(item);
        }
        return result;
    }

    public static FilterDomain[] toArray(List<FilterDomain> filters) {
        return filters.toArray(new FilterDomain[filters.size()]);
    }

    protected Collection<T> queryList(String orderBy, boolean isAscending, FilterDomain... filters) {
        return convert(queryIterable(false, 0, -1, null, null, orderBy, isAscending, null, false, filters));
    }

    protected Collection<T> queryList(FilterDomain... filters) {
        return convert(queryIterable(false, 0, -1, null, null, null, false, null, false, filters));
    }

    protected ResponseList<T> queryPage(int pageSize, String orderBy, boolean isAscending, String cursor, FilterDomain... filters) {
        return queryPage(false, pageSize, null, null, orderBy, isAscending, null, false, cursor, filters);
    }
    
    public Integer countWithFilters(T domain) {
        if (domain == null) {
            return count();
        }
        return count(null, null, convert(domain));
    }
    
    @Override
    public Collection<T> findByFields(T domain) {
        return queryList(convert(domain));
    }

    @Override
    public ResponseList<T> getPageWithFields(T domain, int pageSize, String cursorKey,
            String sortBy, boolean isAscending) {

        return queryPage(pageSize, sortBy, isAscending, cursorKey, convert(domain));
    }
    @Override
    public T findOneRecordByFields(T domain) {
        Collection<T> queryList = queryList(convert(domain));
        return CollectionUtils.isEmpty(queryList) ? null : queryList.iterator().next();
    }
}
