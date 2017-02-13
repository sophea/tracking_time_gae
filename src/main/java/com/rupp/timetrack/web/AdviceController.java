package com.rupp.timetrack.web;

import java.text.DateFormat;
import java.text.FieldPosition;
import java.text.ParsePosition;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

import org.springframework.beans.propertyeditors.CustomDateEditor;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.InitBinder;

@ControllerAdvice
public class AdviceController {

    @InitBinder
    public void initBinder(WebDataBinder binder) {
      binder.registerCustomEditor(Date.class, null, new CustomDateEditor(new MyDateFormat(), true));
    }
    
    @SuppressWarnings("serial")
    protected class MyDateFormat extends DateFormat {

        private final List<? extends DateFormat> DATE_FORMATS = Arrays.asList(new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss'Z'"),
                new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ssZ"), new SimpleDateFormat("yyyy-MM-dd"));

        @Override
        public StringBuffer format(final Date date, final StringBuffer toAppendTo, final FieldPosition fieldPosition) {
            throw new UnsupportedOperationException("This custom date formatter can only be used to *parse* Dates.");
        }

        @Override
        public Date parse(final String source, final ParsePosition pos) {
            Date res = null;
            for (final DateFormat dateFormat : DATE_FORMATS) {
                dateFormat.setLenient(false);
                if ((res = dateFormat.parse(source, pos)) != null) {
                    return res;
                }
            }
            return null;
        }
    }
}
