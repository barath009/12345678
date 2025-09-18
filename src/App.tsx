import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Lazy load pages
const Landing = lazy(() => import("./pages/Landing"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const SoilAnalysis = lazy(() => import("./pages/SoilAnalysis"));
const CropRecommendation = lazy(() => import("./pages/CropRecommendation"));
const DailyTask = lazy(() => import("./pages/DailyTask"));
const ChatAssistant = lazy(() => import("./pages/ChatAssistant"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        {/* Suspense fallback while pages load */}
        <Suspense
          fallback={
            <div className="flex h-screen items-center justify-center">
              Loading...
            </div>
          }
        >
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Main Dashboard & Features */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/soil-analysis" element={<SoilAnalysis />} />
            <Route path="/crop-recommendations" element={<CropRecommendation />} />
            <Route path="/daily-task" element={<DailyTask />} />
            <Route path="/chat-assistant" element={<ChatAssistant />} /> {/* ✅ added */}

            {/* Catch-all route */}
            <Route path="" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
