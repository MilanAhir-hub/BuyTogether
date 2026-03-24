$connectionString = "Server=localhost\SQLEXPRESS;Database=BuyTogether;Trusted_Connection=true;TrustServerCertificate=True;"
$connection = New-Object System.Data.SqlClient.SqlConnection($connectionString)
$connection.Open()

$query = @"
IF COL_LENGTH('Users', 'Bio') IS NULL
BEGIN
    ALTER TABLE Users ADD 
        Bio nvarchar(500) NULL,
        City nvarchar(100) NULL,
        FullName nvarchar(100) NULL,
        PhoneNumber nvarchar(20) NULL,
        PreferredBudgetMax decimal(18,2) NULL,
        PreferredBudgetMin decimal(18,2) NULL,
        PreferredLocation nvarchar(150) NULL,
        TargetGroupSize int NULL;
END
"@

$command = $connection.CreateCommand()
$command.CommandText = $query
$command.ExecuteNonQuery()
$connection.Close()
Write-Host "Database fixed successfully"
