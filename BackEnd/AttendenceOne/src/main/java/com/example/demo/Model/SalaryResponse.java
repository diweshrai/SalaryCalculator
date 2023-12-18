package com.example.demo.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SalaryResponse {

	
	 private String userName;
	    private long totalPresentDays;
	    private long totalAbsentDays;
	    private long totalHalfDays;
	    private long totalSalary;
	
	
}
