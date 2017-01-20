package com.rupp.timetrack.domain;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonIgnore;
public class UserProfile extends AbstractLongDomainEntity {
    @JsonIgnore
    private Long id;
    
    private Long userId;

    private String firstName;

    private String lastName;
    
    private String email;

    private String gender;

    private Date birthOfYear;

    private String address;

    private String photoUrl;
    /**reference id facebook google */
    private String externalId;
    
    private Long totalMyStamps;
    private Long totalMyOffers; 
    
    /**
     * flag true the invite to friends will visible
     * 
     * Apple reviewing this flag is true
     * when it is done we can set it to false
     * */
    private boolean visibleShareToFriend = true;
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
     * @return the firstName
     */
    public String getFirstName() {
        return firstName;
    }

    /**
     * @param firstName the firstName to set
     */
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    /**
     * @return the lastName
     */
    public String getLastName() {
        return lastName;
    }

    /**
     * @param lastName the lastName to set
     */
    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    /**
     * @return the email
     */
    public String getEmail() {
        return email;
    }

    /**
     * @param email the email to set
     */
    public void setEmail(String email) {
        this.email = email;
    }

    /**
     * @return the gender
     */
    public String getGender() {
        return gender;
    }

    /**
     * @param gender the gender to set
     */
    public void setGender(String gender) {
        this.gender = gender;
    }

    /**
     * @return the birthOfYear
     */
    public Date getBirthOfYear() {
        return birthOfYear;
    }

    /**
     * @param birthOfYear the birthOfYear to set
     */
    public void setBirthOfYear(Date birthOfYear) {
        this.birthOfYear = birthOfYear;
    }

    /**
     * @return the address
     */
    public String getAddress() {
        return address;
    }

    /**
     * @param address the address to set
     */
    public void setAddress(String address) {
        this.address = address;
    }

    public String getPhotoUrl() {
        return photoUrl;
    }

    public void setPhotoUrl(String photoUrl) {
        this.photoUrl = photoUrl;
    }

    public String getExternalId() {
        return externalId;
    }

    public void setExternalId(String externalId) {
        this.externalId = externalId;
    }

    /**
     * @return the totalMyStamps
     */
    public Long getTotalMyStamps() {
        return totalMyStamps;
    }

    /**
     * @param totalMyStamps the totalMyStamps to set
     */
    public void setTotalMyStamps(Long totalMyStamps) {
        this.totalMyStamps = totalMyStamps;
    }

    /**
     * @return the totalMyOffers
     */
    public Long getTotalMyOffers() {
        return totalMyOffers;
    }

    /**
     * @param totalMyOffers the totalMyOffers to set
     */
    public void setTotalMyOffers(Long totalMyOffers) {
        this.totalMyOffers = totalMyOffers;
    }

    /**
     * @return the visibleShareToFriend
     */
    public boolean isVisibleShareToFriend() {
        return visibleShareToFriend;
    }

    /**
     * @param visibleShareToFriend the visibleShareToFriend to set
     */
    public void setVisibleShareToFriend(boolean visibleShareToFriend) {
        this.visibleShareToFriend = visibleShareToFriend;
    }

}
