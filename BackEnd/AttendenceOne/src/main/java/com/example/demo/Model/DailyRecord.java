package com.example.demo.Model;

import java.util.Map;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class DailyRecord {

	
	  private String userName;
	    private Map<String, DayRecord> attendance;

	
	    
	    
@Data
@AllArgsConstructor
@NoArgsConstructor
	    public static class DayRecord {
	        @SuppressWarnings("unused")
			private String inTime;
	        @SuppressWarnings("unused")
			private String outTime;
			

	       
	    }
	
	
	
}
