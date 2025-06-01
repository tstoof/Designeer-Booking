using Microsoft.EntityFrameworkCore;
using PBS.Persistence;

var builder = WebApplication.CreateBuilder(args);

// Add DbContext with SQLite connection string
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite("Data Source=localdatabase.db"));

builder.Services.AddControllers();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy.WithOrigins("http://localhost:5173")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

// ✅ Ensure the database and tables are created
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.EnsureCreated();
}

app.UseCors("AllowReactApp");

app.UseAuthorization();

app.MapControllers();

app.Run();
