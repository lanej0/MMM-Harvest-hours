require_relative 'defaults'

todayDate = Time.now.strftime("%Y-%m-%d")

# Grab hours for today
todayURL = @teamReportUrl + "?from=" + todayDate + "&to=" + todayDate
todayHrs = HTTParty.get(todayURL, {
  headers: {"Harvest-Account-ID" => @acctID, "Authorization" => @authToken, "User-Agent" => "Hours reporting", "Accept" => "application/json"}
})

x=0
todayHrs["results"].each do
  if todayHrs["results"][x]["user_id"].to_s == @userID
    puts todayHrs["results"][x]["total_hours"].to_s
  end
  x=x+1
end
