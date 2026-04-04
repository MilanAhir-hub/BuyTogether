using BuyTogether.Server.Data;
using BuyTogether.Server.Constants;
using BuyTogether.Server.Interfaces;
using BuyTogether.Server.Services;
using BuyTogether.Server.Hubs;
using BuyTogether.Server.Jobs;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:5173")
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials(); // Required for cookies
    });
});

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddMemoryCache();
builder.Services.AddSignalR();

// Configure Entity Framework Core with SQL Server
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Configure JWT Authentication
var jwtKey = builder.Configuration["Jwt:Key"] ?? throw new InvalidOperationException("JWT Key is missing from configuration.");
var jwtIssuer = builder.Configuration["Jwt:Issuer"];
var jwtAudience = builder.Configuration["Jwt:Audience"];

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = false, // Temporarily disabled for debugging
            ValidateAudience = false, // Temporarily disabled for debugging
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = jwtIssuer,
            ValidAudience = jwtAudience,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey))
        };
    });

builder.Services.AddAuthorization(options =>
{
    options.AddPolicy(AuthorizationPolicies.BuyerOnly, policy =>
        policy.RequireAuthenticatedUser()); // Allow any logged-in user to participate in buying groups
});

// Register Custom Services
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<IPropertyService, PropertyService>();
builder.Services.AddScoped<IUserProfileService, UserProfileService>();
builder.Services.AddScoped<IBuyerPropertyService, BuyerPropertyService>();
builder.Services.AddScoped<IBuyerDealService, BuyerDealService>();
builder.Services.AddScoped<IUserNotificationService, UserNotificationService>();

// Register Group Buying Services
builder.Services.AddScoped<IDealService, DealService>();
builder.Services.AddScoped<IDealGroupService, DealGroupService>();
builder.Services.AddScoped<IOrderService, OrderService>();
builder.Services.AddHostedService<GroupExpiryBackgroundService>();

// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

var app = builder.Build();

app.UseCors("AllowFrontend");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
app.MapHub<GroupHub>("/hubs/group");

app.Run();
