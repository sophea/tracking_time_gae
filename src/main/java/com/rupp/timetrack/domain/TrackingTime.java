package com.rupp.timetrack.domain;

import java.util.Date;

import javax.persistence.Basic;
import javax.persistence.Id;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonFormat;
public class TrackingTime extends AbstractLongDomainEntity {
    @Id
    private Long id;
    @Basic
    private Long userId;
    /** subject: string - Java programming*/
    @Basic
    private String subject;
    //description : string - lesson ch1 - java basic
    @Basic
    private String description;
    
    //hours : long - number of teaching 3h
    @Basic
    private Long hours;
    //date : date - teaching date
    @Basic
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date date;
    
    //dateType:String  weekday or weekend
    @Basic
    private String dateType;
    
    //forMonth - Long (1,2,3,...12) it is used for billing invoice in which month.
    @Basic
    private Long forMonth;
    
    //forMonth - Long (2017)
    @Basic
    private Long forYear;
    
    //state (1 pending, 2  approved, 3 paid, -1 - rejected) : long
    @Basic
    private Long state;
    
    //superUserId - long
    @Basic
    private Long superUserId;
    
    //superComment - string
    @Basic
    private String superComment;

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
     * @return the userId
     */
    public Long getUserId() {
        return userId;
    }

    /**
     * @param userId the userId to set
     */
    public void setUserId(Long userId) {
        this.userId = userId;
    }

    /**
     * @return the subject
     */
    public String getSubject() {
        return subject;
    }

    /**
     * @param subject the subject to set
     */
    public void setSubject(String subject) {
        this.subject = subject;
    }

    /**
     * @return the description
     */
    public String getDescription() {
        return description;
    }

    /**
     * @param description the description to set
     */
    public void setDescription(String description) {
        this.description = description;
    }

    /**
     * @return the hours
     */
    public Long getHours() {
        return hours;
    }

    /**
     * @param hours the hours to set
     */
    public void setHours(Long hours) {
        this.hours = hours;
    }

    /**
     * @return the date
     */
    public Date getDate() {
        return date;
    }

    /**
     * @param date the date to set
     */
    public void setDate(Date date) {
        this.date = date;
    }

    /**
     * @return the dateType
     */
    public String getDateType() {
        return dateType;
    }

    /**
     * @param dateType the dateType to set
     */
    public void setDateType(String dateType) {
        this.dateType = dateType;
    }

    /**
     * @return the forMonth
     */
    public Long getForMonth() {
        return forMonth;
    }

    /**
     * @param forMonth the forMonth to set
     */
    public void setForMonth(Long forMonth) {
        this.forMonth = forMonth;
    }

    /**
     * @return the state
     */
    public Long getState() {
        return state;
    }

    /**
     * @param state the state to set
     */
    public void setState(Long state) {
        this.state = state;
    }

    /**
     * @return the superUserId
     */
    public Long getSuperUserId() {
        return superUserId;
    }

    /**
     * @param superUserId the superUserId to set
     */
    public void setSuperUserId(Long superUserId) {
        this.superUserId = superUserId;
    }

    /**
     * @return the superComment
     */
    public String getSuperComment() {
        return superComment;
    }

    /**
     * @param superComment the superComment to set
     */
    public void setSuperComment(String superComment) {
        this.superComment = superComment;
    }

    /**
     * @return the forYear
     */
    public Long getForYear() {
        return forYear;
    }

    /**
     * @param forYear the forYear to set
     */
    public void setForYear(Long forYear) {
        this.forYear = forYear;
    }
}
