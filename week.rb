require_relative 'defaults'

if Time.now.strftime("%A") == "Monday"
  mondayDate = Time.now.strftime("%Y-%m-%d")
else
  mondayDate = Chronic.parse("last Monday").strftime("%Y-%m-%d")
end

if Time.now.strftime("%A") == "Friday"
  fridayDate = Time.now.strftime("%Y-%m-%d")
else
  fridayDate = Chronic.parse("this Friday").strftime('%Y-%m-%d')
end

# Grab hours for week
weekURL = @teamReportUrl + "?from=" + mondayDate + "&to=" + fridayDate
weekHrs = HTTParty.get(weekURL, {
  headers: {"Harvest-Account-ID" => @acctID, "Authorization" => @authToken, "User-Agent" => "Hours reporting", "Accept" => "application/json"}
})

x=0
weekHrs["results"].each do
  if weekHrs["results"][x]["user_id"].to_s == @userID
    puts weekHrs["results"][x]["total_hours"].to_s
  end
  x=x+1
end
