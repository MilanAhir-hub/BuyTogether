$ErrorActionPreference = "Stop"
$logFile = "test_result.log"

"Starting API..." | Out-File $logFile
$proc = Start-Process -FilePath "dotnet" -ArgumentList "run" -WorkingDirectory "c:\Users\Milan Gagiya\Documents\PROJECT RESUME\BuyTogether\server" -RedirectStandardOutput "server.log" -RedirectStandardError "server_err.log" -PassThru -NoNewWindow
Start-Sleep -Seconds 7

$ticks = (Get-Date).Ticks
$uniqueUser = "user_$ticks"
$uniqueEmail = "user_$ticks@example.com"

"Testing Signup with $uniqueEmail..." | Out-File $logFile -Append
$signupBody = @{
    Username = $uniqueUser
    Email    = $uniqueEmail
    Password = "SecurePassword123!"
} | ConvertTo-Json

try {
    $signupResponse = Invoke-RestMethod -Uri "http://localhost:5096/api/auth/signup" -Method Post -Body $signupBody -ContentType "application/json"
    "Signup Response: $($signupResponse | ConvertTo-Json -Depth 5)" | Out-File $logFile -Append
}
catch {
    "Signup Failed: $_" | Out-File $logFile -Append
}

"Testing Login..." | Out-File $logFile -Append
$loginBody = @{
    Email    = $uniqueEmail
    Password = "SecurePassword123!"
} | ConvertTo-Json

try {
    $loginResponse = Invoke-RestMethod -Uri "http://localhost:5096/api/auth/login" -Method Post -Body $loginBody -ContentType "application/json"
    "Login Response: $($loginResponse | ConvertTo-Json -Depth 5)" | Out-File $logFile -Append
    $token = $loginResponse.token
}
catch {
    "Login Failed: $_" | Out-File $logFile -Append
}

"Testing Logout..." | Out-File $logFile -Append
try {
    $headers = @{ "Authorization" = "Bearer $token" }
    $logoutResponse = Invoke-RestMethod -Uri "http://localhost:5096/api/auth/logout" -Method Post -Headers $headers -ContentType "application/json"
    "Logout Response: $($logoutResponse | ConvertTo-Json -Depth 5)" | Out-File $logFile -Append
}
catch {
    "Logout Failed: $_" | Out-File $logFile -Append
}

"Stopping API..." | Out-File $logFile -Append
Stop-Process -Id $proc.Id -Force
"Test complete." | Out-File $logFile -Append
