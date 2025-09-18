import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { 
  Sprout, 
  BarChart3, 
  Smartphone, 
  Shield, 
  MessageCircle, 
  Camera,
  ArrowRight,
  CheckCircle,
  MapPin,
  Users,
  TrendingUp
} from "lucide-react";
import heroImage from "@/assets/hero-agriculture.jpg";
import farmerTechImage from "@/assets/farmer-technology.jpg";
import featuresImage from "@/assets/features-collage.jpg";

const Landing = () => {
  const features = [
    {
      icon: BarChart3,
      title: "Soil Analysis & Fertility",
      description: "AI-powered soil testing and fertility analysis to optimize your crop yields.",
      color: "text-earth",
      link: "/soil-analysis" // ✅ Added route for first feature
    },
    {
      icon: Sprout,
      title: "Smart Crop Recommendations",
      description: "Get personalized crop suggestions based on your soil, climate, and market data.",
      color: "text-leaf"
    },
    {
      icon: Smartphone,
      title: "Daily Task Management",
      description: "Receive daily reminders for watering, fertilizing, and other farming activities.",
      color: "text-sky"
    },
   
    {
      icon: MessageCircle,
      title: "AI Chat Assistant",
      description: "24/7 agricultural expert assistance through our intelligent chatbot.",
      color: "text-primary"
    },
    {
      icon: Shield,
      title: "Continuous Learning",
      description: "System improves recommendations based on your feedback and local conditions.",
      color: "text-accent"
    }
  ];

  const stats = [
    { number: "50K+", label: "Active Farmers", icon: Users },
    { number: "2.5x", label: "Average Yield Increase", icon: TrendingUp },
    { number: "150+", label: "Supported Crops", icon: Sprout },
    { number: "25+", label: "Countries Served", icon: MapPin }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="bg-white/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Sprout className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-primary">Krishi Sakhi</span>
            </div>
            <div className="flex items-center space-x-4">
              {/* ✅ Added Soil Analysis link in navbar */}
             
              <Link to="/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link to="/register">
                <Button>Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-sky opacity-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${heroImage})` }}
        ></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-6 bg-leaf/10 text-leaf border-leaf/20">
                AI-Powered Agricultural Intelligence
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
                Grow Smarter with 
                <span className="text-primary block">AI Agriculture</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Transform your farming with intelligent soil analysis, personalized crop recommendations, 
                and real-time agricultural guidance powered by advanced AI technology.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/register">
                  <Button size="lg" className="bg-gradient-primary shadow-leaf group">
                    Start Free Trial
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="ghost">Login</Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-nature rounded-3xl transform rotate-3 opacity-20"></div>
              <img 
                src={farmerTechImage} 
                alt="Farmer using technology" 
                className="relative rounded-3xl shadow-earth w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-primary rounded-full mb-4">
                  <stat.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <div className="text-3xl font-bold text-foreground mb-2">{stat.number}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-6 bg-accent/10 text-accent border-accent/20">
              Complete Agricultural Solution
            </Badge>
            <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6">
              Everything You Need to
              <span className="text-primary block">Maximize Your Harvest</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our comprehensive platform combines cutting-edge AI with practical farming knowledge 
              to help you make data-driven decisions and increase productivity.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => {
              const cardContent = (
                <Card className="relative group hover:shadow-glow transition-all duration-300 border-border/50 cursor-pointer">
                  <CardHeader>
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-nature mb-4`}>
                      <feature.icon className={`w-6 h-6 ${feature.color}`} />
                    </div>
                    <CardTitle className="text-xl mb-2">{feature.title}</CardTitle>
                    <CardDescription className="text-base leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              );
              return feature.link ? (
                <Link to={feature.link} key={index}>
                  {cardContent}
                </Link>
              ) : (
                <div key={index}>{cardContent}</div>
              );
            })}
          </div>

          <div className="relative rounded-3xl overflow-hidden">
            <img 
              src={featuresImage} 
              alt="Agricultural features" 
              className="w-full h-64 lg:h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-primary/80 flex items-center justify-center">
              <div className="text-center text-white">
                <h3 className="text-2xl lg:text-4xl font-bold mb-4">
                  Ready to Transform Your Farm?
                </h3>
                <p className="text-lg mb-6 opacity-90">
                  Join thousands of farmers already using AI to boost their yields
                </p>
                <Link to="/register">
                  <Button size="lg" variant="secondary" className="shadow-lg">
                    Start Your Journey
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <Badge className="mb-6 bg-leaf/10 text-leaf border-leaf/20">
                Proven Results
              </Badge>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
                Why Farmers Choose AgriAssist
              </h2>
              <div className="space-y-6">
                {[
                  "Increase crop yields by up to 250% with AI-driven recommendations",
                  "Reduce fertilizer costs through precise soil analysis",
                  
                  "Multi-language support for farmers worldwide",
                  "Works offline in areas with limited internet connectivity",
                  "Continuous learning adapts to local farming conditions"
                ].map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-leaf mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-earth rounded-3xl transform -rotate-3 opacity-20"></div>
              <Card className="relative p-8 shadow-earth">
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl text-primary">Start Free Today</CardTitle>
                  <CardDescription>No credit card required</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    
                  </div>
                  <div className="space-y-3">
                    {[
                      "Complete soil analysis",
                      "Unlimited crop recommendations",
                      "Disease detection for up to 50 photos",
                      "Daily task management",
                      "Basic chat support"
                    ].map((feature, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <CheckCircle className="w-4 h-4 text-leaf" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <Link to="/register" className="block">
                    <Button className="w-full bg-gradient-primary">
                      Get Started Free
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <Sprout className="w-5 h-5" />
                </div>
                <span className="text-xl font-bold">AgriAssist</span>
              </div>
              <p className="text-primary-foreground/80">
                Empowering farmers worldwide with AI-driven agricultural intelligence.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Platform</h3>
              <div className="space-y-2 text-primary-foreground/80">
                {/* ✅ Link to Soil Analysis */}
                <Link to="/soil-analysis" className="hover:underline block">
                  Soil Analysis
                </Link>
                <div>Crop Recommendations</div>
                <div>Disease Detection</div>
                <div>Chat Assistant</div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <div className="space-y-2 text-primary-foreground/80">
                <div>Help Center</div>
                <div>Contact Us</div>
                <div>Community</div>
                <div>Documentation</div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <div className="space-y-2 text-primary-foreground/80">
                <div>About Us</div>
                <div>Privacy Policy</div>
                <div>Terms of Service</div>
                <div>Blog</div>
              </div>
            </div>
          </div>
          <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-primary-foreground/80">
            <p>&copy; 2024 AgriAssist. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
