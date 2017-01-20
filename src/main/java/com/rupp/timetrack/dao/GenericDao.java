package com.rupp.timetrack.dao;

import java.util.Collection;
import java.util.Date;

import com.sma.common.ResponseList;

public interface GenericDao <T> {

    T findById( Long id);

    Collection<T> findByIds(Collection<Long> ids);

    void add(T domain);

    void add(Iterable<T> domains);

    void update(T domain);

    void update(Iterable<T> domains);

    Collection<T> getAll();

    void remove(Long id);

    void remove(Iterable<T> domains);

    ResponseList<T> getPage(int limit, String offset);

    int count();

    Integer countWithFilters(T domain);

    Collection<T> findByFields(T domain);
    
    T findOneRecordByFields(T domain);

    ResponseList<T> getPageWithFields(T domain, int pageSize, String cursorKey, 
            String sortBy, boolean isAscending);
    
    Long getLastModifyRecord(Date dateSince);
}
