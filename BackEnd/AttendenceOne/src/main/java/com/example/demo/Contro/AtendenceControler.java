package com.example.demo.Contro;

import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Model.DailyRecord;
import com.example.demo.Model.SalaryResponse;

@RestController
@CrossOrigin(origins = "*")
public class AtendenceControler {

	@PostMapping("/getSalary")
	public SalaryResponse sendSalary(@RequestBody DailyRecord dailyRecord) {
		List<String> totalAtendence = new ArrayList<>();

		for (Map.Entry<String, DailyRecord.DayRecord> entry : dailyRecord.getAttendance().entrySet()) {
			String inTime = entry.getValue().getInTime();
			String outTime = entry.getValue().getOutTime();

			int attendanceCode = calculateAttendanceCode(inTime, outTime);

			switch (attendanceCode) {
			case 1:
				totalAtendence.add("P");
				break;
			case 0:
				totalAtendence.add("AB");
				break;
			case -1:
				totalAtendence.add("H");
				break;
			
			}
		}

		
		long pCount = totalAtendence.stream().filter("P"::equals).count();
		long abCount = totalAtendence.stream().filter("AB"::equals).count();
		long hCount = totalAtendence.stream().filter("H"::equals).count();

		
		long totalAmount = (pCount * 500) + (abCount * 0) + (hCount * 250);
		System.out.println(totalAtendence);
		
		try {
			return new SalaryResponse(dailyRecord.getUserName(), pCount, abCount, hCount, totalAmount);
		} catch (Exception e) {
			e.printStackTrace();
			
			return null;

		}
	}

	private int calculateAttendanceCode(String inTime, String outTime) {

		if ("00:00 AM".equals(inTime) && "00:00 PM".equals(outTime)) {
			return 0; 
		}

		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("h:mm a", Locale.ENGLISH);

		LocalTime inLocalTime = LocalTime.parse(inTime, formatter);
		LocalTime outLocalTime = LocalTime.parse(outTime, formatter);

		long hours = java.time.Duration.between(inLocalTime, outLocalTime).toHours();

		if (hours >= 2 && hours <= 5) {
			return -1;
		} else if (hours >= 6 && hours <= 20) {
			return 1;
		} else if (hours == 0) {
			return 0;
		} else if (hours <= 2) {
			return 0;
		}

		else {

			return -99;
		}

	}
}
