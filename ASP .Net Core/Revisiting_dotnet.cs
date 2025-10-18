//using System.Text.Json;

////this will sets up and creates the kestrel server
using System.Text.Json;

var builder = WebApplication.CreateBuilder(args);
////app is the instance of the web application
var app = builder.Build();
////Middleware pipeline
//app.MapGet("/", () => "Hello World!");


app.Run(async (HttpContext context) =>
{
if (context.Request.Path.StartsWithSegments("/"))
{
context.Response.Headers["Content-Type"] = "text/html";
await context.Response.WriteAsync($"The method is: {context.Request.Method}<br/>");
await context.Response.WriteAsync($"The path is: {context.Request.Path}<br/>");
await context.Response.WriteAsync($"<b>Headers</b>: <br/>");
foreach (var key in context.Request.Headers.Keys)
{
await context.Response.WriteAsync($"{key}: {context.Request.Headers[key]}\r\n");
}

}
else if (context.Request.Path.StartsWithSegments("/employees"))
{
if (context.Request.Method == "GET")
{
var employees = EmployeeRepository.GetEmployees();
foreach (var employee in employees)
{
await context.Response.WriteAsync($"Employee ID: {employee.Id}\r\n");
await context.Response.WriteAsync($"Employee Name: {employee.Name}\r\n");
await context.Response.WriteAsync($"Employee Position: {employee.Position} \r\n");
await context.Response.WriteAsync($"Employee Salary: {employee.Salary} \r\n");

}
// await context.Response.WriteAsync("Employees List");

}
else if (context.Request.Method == "POST")
{
using var reader = new StreamReader(context.Request.Body);
var body = await reader.ReadToEndAsync();
var employee = JsonSerializer.Deserialize<Employee>(body);
EmployeeRepository.AddEmployee(employee);
//await context.Response.WriteAsync($"emp2: {emp2.Name}");

}
else if (context.Request.Method == "PUT")
{

using var reader = new StreamReader(context.Request.Body);
var body = await reader.ReadToEndAsync();
var employee = JsonSerializer.Deserialize<Employee>(body);
EmployeeRepository.UpdateEmployee(employee);
//await context.Response.WriteAsync($"emp2: {emp2.Name}");
}
else if (context.Request.Method == "DELETE")
{
if (context.Request.Query.ContainsKey("id"))
{
var id = context.Request.Query["id"];
if (int.TryParse(id, out int employeeId))
{
if (context.Request.Headers["Authorization"] == "srinu")
{
var result = EmployeeRepository.DeleteEmployee(employeeId);
if (result)
{
await context.Response.WriteAsync("Employee Deleted Successfully");
}
else
{
await context.Response.WriteAsync("Employee not found");
}

}
else
{
await context.Response.WriteAsync("You are not authorized");
}
}
}


//foreach(var key in context.Request.Query.Keys)
//{
//await context.Response.WriteAsync($"{key}: {context.Request.Query[key]}\r\n");
//}
//await context.Response.WriteAsync(context.Request.QueryString.ToString());
}

}

});

// this runs the web application and makes the kestrel server listens to http requests
app.Run();
//kestrel server takes the http request which is a string and converts that into HttpContext object

static class EmployeeRepository
{
    private static List<Employee> employees = new List<Employee>
    {
        new Employee(1, "Srinu", "Engineer", 10),
        new Employee(2, "John", "Manager", 20),
        new Employee(3, "Sam", "Technician", 40)
    };
    public static List<Employee> GetEmployees() => employees;

    public static void AddEmployee(Employee? employee)
    {
        if (employee is not null)
            employees.Add(employee);
    }

    public static bool UpdateEmployee(Employee? employee)
    {
        if (employee is not null)
        {
            var emp = employees.FirstOrDefault(x => x.Id == employee.Id);
            if (emp is not null)
            {
                emp.Name = employee.Name;
                emp.Position = employee.Position;
                emp.Salary = 1999;
                return true;
            }

        }
        return false;
    }
    public static bool DeleteEmployee(int? id)
    {
        if (id is not null)
        {
            var emp = employees.FirstOrDefault(x => x.Id == id);
            if (emp is not null)
            {
                employees.Remove(emp);
                return true;
            }
        }
        return false;
    }
}
public class Employee
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Position { get; set; }
    public double Salary { get; set; }
    public Employee(int id, string name, string position, double salary)
    {
        Id = id;
        Name = name;
        Position = position;
        Salary = salary;
    }
}
