package com.rupp.timetrack.utils;

import java.util.Date;

import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;

import org.apache.commons.lang3.StringUtils;
import org.joda.time.DateTime;
import org.joda.time.Years;

import com.rupp.timetrack.web.BusinessError;

public final class ValidationUtils {
    private ValidationUtils() {
    }

    public static void validateNotNull(String fieldName, String data) {
        if (StringUtils.isEmpty(data)) {
            //throw new BusinessException(String.format("The field [%s] must be mandatory", fieldName));
            BusinessError.OBJECT_INVALID_REQUEST.throwException(String.format("The field [%s] must be mandatory", fieldName));
        }
    }

    public static boolean isInvalid(String email) {
        try {
            InternetAddress emailAddr = new InternetAddress(email);
            emailAddr.validate();
        } catch (AddressException ex) {
            return true;
        }
        return false;
    }


    public static boolean isUnder16(Date date) {
        if (date == null) {
            return false;
        }
        final DateTime now = new DateTime();
        final DateTime birthDay = new DateTime(date);
        return Years.yearsBetween(birthDay, now).getYears() < 16;
    }
}
