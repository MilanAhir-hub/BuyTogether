# This script updates a specific user to the 'Seller' role in the TogetherBuy database.
param (
    [Parameter(Mandatory = $true)]
    [string]$Email
)

$serverName = "localhost\SQLEXPRESS"
$databaseName = "BuyTogetherDb"
$query = "UPDATE [Users] SET [Role] = 'Seller' WHERE [Email] = '$Email';"

try {
    Write-Host "Connecting to database $databaseName on $serverName..."
    Invoke-Sqlcmd -ServerInstance $serverName -Database $databaseName -Query $query -ErrorAction Stop
    Write-Host ""
    Write-Host "Success! The user with email '$Email' is now a 'Seller'." -ForegroundColor Green
    Write-Host "Please ask the user to log out and log back in for the new role to take effect." -ForegroundColor Yellow
}
catch {
    Write-Host "Failed to update role: $($_.Exception.Message)" -ForegroundColor Red
}
