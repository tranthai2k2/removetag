using tesst.Services;

var builder = WebApplication.CreateBuilder(args);

// Thêm các dịch vụ vào container DI
builder.Services.AddControllers();
builder.Services.AddSwaggerGen();

builder.Services.AddScoped<IUserService, UserService>();

// Đăng ký DbService
builder.Services.AddScoped<IDbService, DbService>(); // Đăng ký IDbService
builder.Services.AddScoped<INewsPostService, NewsPostService>(); // Đăng ký IDbService
builder.Services.AddScoped<ILikePotsService, LikePotsService>(); // Sửa lại dòng này

// Cấu hình PostgreSQL connection string (nếu cần)
builder.Services.AddSingleton<IConfiguration>(builder.Configuration);

var app = builder.Build();

// Cấu hình middleware
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(builder =>
    builder
        .AllowAnyOrigin()
        .AllowAnyMethod()
        .AllowAnyHeader()
);

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers(); // Định tuyến đến các controller
app.Run();
