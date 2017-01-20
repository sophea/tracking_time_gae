package com.rupp.timetrack.domain;

import java.util.Date;

import javax.persistence.Basic;
import javax.persistence.Entity;
import javax.persistence.Id;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sma.common.gaesupport.datastore.baseObject.AbstractLongEntity;

/**
 * @author sophea
 */
@Entity
public abstract class AbstractLongDomainEntity  extends AbstractLongEntity {
    
    public static final String COLUMN_NAME_ID = "id";
    public static final String COLUMN_NAME_VERSION = "version";
    public static final String COLUMN_NAME_STATE = "state";
    /**unique id*/
    @Id
    private Long id;
    /**version number changes */
    @Basic
    private Long version;
    /**state */
    @Basic
    private Long state;
    /**created by*/
    @Basic
    @JsonIgnore
    private String createdBy;
    /**created date*/
    @Basic
    @JsonIgnore
    private Date createdDate;
    /**updated by*/
    @Basic
    @JsonIgnore
    private String updatedBy;
    /**updated date*/
    @Basic
    private Date updatedDate;

    /**
     * @return the id
     */
    public Long getId() {
        return id;
    }

    /**
     * @param id the id to set
     */
    public void setId(Long id) {
        this.id = id;
    }

    /**
     * @return the version
     */
    public Long getVersion() {
        return version;
    }

    /**
     * @param version the version to set
     */
    public void setVersion(Long version) {
        this.version = version;
    }

    /**
     * @return the createdBy
     */
    public String getCreatedBy() {
        return createdBy;
    }

    /**
     * @param createdBy the createdBy to set
     */
    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public Long getState() {
        return state;
    }

    public void setState(Long state) {
        this.state = state;
    }

    public Date getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(Date createdDate) {
        this.createdDate = createdDate;
    }

    public String getUpdatedBy() {
        return updatedBy;
    }

    public void setUpdatedBy(String updatedBy) {
        this.updatedBy = updatedBy;
    }

    public Date getUpdatedDate() {
        return updatedDate;
    }

    public void setUpdatedDate(Date updatedDate) {
        this.updatedDate = updatedDate;
    }

}
