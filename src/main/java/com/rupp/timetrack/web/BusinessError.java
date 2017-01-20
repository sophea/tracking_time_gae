package com.rupp.timetrack.web;

import com.sma.common.BusinessException;

public enum BusinessError {

    OBJECT_NOT_FOUND (404, "object is not found in the system"),
    OBJECT_INVALID_REQUEST (400, "param request is not valid");
    
    private int code;
    private String message;

    private BusinessError(int code, String message) {
        this.code = code;
        this.message = message;
    }

    public int getCode() {
        return code;
    }
    public String getMessage() {
        return message;
    }
    public void setMessage(String message) {
        this.message = message;
    }
    public BusinessError appendMessage(String message) {
         String.format("%s [%s]", getMessage(), message);
         return this;
    }
    public void throwException() throws BusinessException {
        throw new BusinessException(message, code);
    }
    public void throwException(String message) throws BusinessException {
        throw new BusinessException(message, code);
    }
}
