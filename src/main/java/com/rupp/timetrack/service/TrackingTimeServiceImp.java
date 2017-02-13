package com.rupp.timetrack.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rupp.timetrack.dao.TrackingTimeDao;
import com.rupp.timetrack.domain.TrackingTime;

@Service("trackingTimeService")
public class TrackingTimeServiceImp  extends BaseService<TrackingTimeDao, TrackingTime> {
    
    
    public TrackingTimeServiceImp() {
        super(TrackingTime.class);
    }
    

    @Autowired
    public void setDao(TrackingTimeDao dao) {
        this.dao = dao;
    }
}
