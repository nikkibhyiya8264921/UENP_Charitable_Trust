
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Lock } from "lucide-react";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate authentication process
    setTimeout(() => {
      if (username === "admin" && password === "admin123") {
        // Store authentication state (in a real app, use proper JWT/secure storage)
        localStorage.setItem("adminAuthenticated", "true");
        toast.success("Login successful!");
        navigate("/admin/dashboard");
      } else {
        toast.error("Invalid credentials");
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gray-50">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <div className="mb-6 flex flex-col items-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-ngo-orange/10 text-ngo-orange">
            <Lock size={32} />
          </div>
          <h2 className="mt-4 text-2xl font-bold">Admin Login</h2>
          <p className="text-center text-gray-600">
            Enter your credentials to access the admin dashboard
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="mb-2 block text-sm font-medium">
              Username
            </label>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
              className="w-full"
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-2 block text-sm font-medium">
              Password
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="w-full"
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="btn-primary-gradient w-full py-2 text-white"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                Logging in...
              </div>
            ) : (
              "Login"
            )}
          </Button>
        </form>

        <div className="mt-4 text-center text-sm">
          <p className="text-gray-600">
            For demo purposes, use: <span className="font-medium">admin</span> / <span className="font-medium">admin123</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
