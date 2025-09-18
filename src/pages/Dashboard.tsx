import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/ui/navigation";
import { Link } from "react-router-dom";
import { 
  BarChart3, 
  Sprout, 
  Calendar, 
  TrendingUp,
  Droplets,
  Cloud,
  AlertTriangle,
  CheckCircle,
  ArrowRight
} from "lucide-react";

const Dashboard = () => {
  // ✅ Load saved farm location (or fallback to Kochi)
  const defaultCity = localStorage.getItem("userLocation") || "Kochi";
  const [city, setCity] = useState(defaultCity);
  const [inputCity, setInputCity] = useState("");
  const [weatherData, setWeatherData] = useState({
    location: "Loading...",
    temperature: "--°C",
    humidity: "--%",
    condition: "Fetching...",
    rainfall: "--mm"
  });

  // ✅ Fetch weather whenever city changes
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
        const queryCity = city.trim().replace(/\s+/g, " ");
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${queryCity},IN&appid=${apiKey}&units=metric`;

        const response = await axios.get(url);
        const data = response.data;

        setWeatherData({
          location: `${data.name}, ${data.sys.country}`,
          temperature: `${Math.round(data.main.temp)}°C`,
          humidity: `${data.main.humidity}%`,
          condition: data.weather[0].description,
          rainfall: data.rain ? `${data.rain["1h"] || data.rain["3h"] || 0}mm` : "0mm"
        });
      } catch (error: any) {
        console.error("Weather API error:", error.response ? error.response.data : error.message);
        setWeatherData({
          location: city,
          temperature: "--°C",
          humidity: "--%",
          condition: "Error fetching data",
          rainfall: "--mm"
        });
      }
    };

    fetchWeather();
  }, [city]);

  const quickStats = [
    { title: "Active Crops", value: "3", change: "+1 this month", icon: Sprout, color: "text-leaf" },
    { title: "Soil Health", value: "Good", change: "pH 6.8", icon: BarChart3, color: "text-earth" },
    { title: "Water Level", value: "78%", change: "Optimal", icon: Droplets, color: "text-sky" },
    { title: "Next Task", value: "2 hours", change: "Irrigation", icon: Calendar, color: "text-harvest" }
  ];

  const recentActivities = [
    { action: "Soil test completed", time: "2 hours ago", status: "completed" },
    { action: "Corn crop recommendation updated", time: "5 hours ago", status: "info" },
    { action: "Disease scan: No issues found", time: "1 day ago", status: "completed" },
    { action: "Fertilizer application reminder", time: "2 days ago", status: "pending" }
  ];

  const todaysTasks = [
    { task: "Check soil moisture levels", priority: "high", completed: false },
    { task: "Apply organic fertilizer to tomato section", priority: "medium", completed: true },
    { task: "Inspect crops for pest damage", priority: "medium", completed: false },
    { task: "Water the greenhouse plants", priority: "low", completed: true }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome back ! 🌱
          </h1>
          <p className="text-muted-foreground">
            Here's what's happening on your farm today
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {quickStats.map((stat, index) => (
            <Card key={index} className="hover:shadow-glow transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                  <Badge variant="secondary" className="text-xs">
                    {stat.change}
                  </Badge>
                </div>
                <div className="text-2xl font-bold text-foreground mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.title}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          {/* Weather Widget */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Cloud className="w-5 h-5 text-sky" />
                  <span>Weather Today</span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* ✅ Manual City Search */}
              <div className="flex space-x-2 mb-4">
                <Input 
                  placeholder="Enter city..." 
                  value={inputCity} 
                  onChange={(e) => setInputCity(e.target.value)} 
                />
                <Button 
                  onClick={() => {
                    if (inputCity.trim() !== "") {
                      setCity(inputCity.trim());
                      setInputCity("");
                    }
                  }}
                >
                  Search
                </Button>
              </div>

              {/* ✅ Reset to Farm Location */}
              <Button
                variant="outline"
                className="mb-4 w-full"
                onClick={() => {
                  const saved = localStorage.getItem("userLocation");
                  if (saved) setCity(saved);
                }}
              >
                Reset to My Farm Location
              </Button>

              <div className="text-center mb-4">
                <div className="text-xl font-semibold text-muted-foreground mb-1">
                  📍 {weatherData.location}
                </div>
                <div className="text-3xl font-bold text-foreground mb-2">
                  {weatherData.temperature}
                </div>
                <div className="text-muted-foreground capitalize">
                  {weatherData.condition}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <Droplets className="w-4 h-4 text-sky" />
                  <span>{weatherData.humidity}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Cloud className="w-4 h-4 text-muted-foreground" />
                  <span>{weatherData.rainfall}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Today's Tasks */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-harvest" />
                  <span>Today's Tasks</span>
                </div>
                <Link to="/daily-tasks">
                  <Button variant="ghost" size="sm">
                    View All <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {todaysTasks.map((task, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 rounded-lg bg-muted/30">
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                      task.completed 
                        ? "bg-leaf border-leaf" 
                        : "border-muted-foreground"
                    }`}>
                      {task.completed && <CheckCircle className="w-3 h-3 text-white" />}
                    </div>
                    <div className="flex-1">
                      <div className={`text-sm ${task.completed ? "line-through text-muted-foreground" : "text-foreground"}`}>
                        {task.task}
                      </div>
                    </div>
                    <Badge 
                      variant={task.priority === "high" ? "destructive" : task.priority === "medium" ? "default" : "secondary"}
                      className="text-xs"
                    >
                      {task.priority}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              <span>Recent Activity</span>
            </CardTitle>
            <CardDescription>
              Your latest farming activities and system updates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 rounded-lg border border-border/50">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.status === "completed" ? "bg-leaf" :
                    activity.status === "pending" ? "bg-harvest" : "bg-sky"
                  }`} />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-foreground">
                      {activity.action}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {activity.time}
                    </div>
                  </div>
                  {activity.status === "pending" && (
                    <AlertTriangle className="w-4 h-4 text-harvest" />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Dashboard;
