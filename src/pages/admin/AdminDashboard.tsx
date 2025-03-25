
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSiteData } from "@/context/SiteDataContext";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  Save,
  Edit,
  Trash2,
  PlusCircle,
  LogOut,
  Home,
  User,
  Users,
  FileImage,
  Phone,
  LayoutDashboard,
  Settings,
} from "lucide-react";

const AdminDashboard = () => {
  const { siteData, updateSiteData } = useSiteData();
  const [localData, setLocalData] = useState({ ...siteData });
  const [activeTab, setActiveTab] = useState("organization");
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated
    const isAuthenticated = localStorage.getItem("adminAuthenticated");
    if (!isAuthenticated) {
      navigate("/admin");
    }
  }, [navigate]);

  // Handle form data changes
  const handleChange = (section: string, field: string, value: any) => {
    setLocalData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
    setUnsavedChanges(true);
  };

  // Handle nested field changes
  const handleNestedChange = (
    section: string,
    subsection: string,
    field: string,
    value: any
  ) => {
    setLocalData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [subsection]: {
          ...prev[section][subsection],
          [field]: value,
        },
      },
    }));
    setUnsavedChanges(true);
  };

  // Handle array item changes
  const handleArrayItemChange = (
    section: string,
    index: number,
    field: string,
    value: any
  ) => {
    const updatedArray = [...localData[section]];
    updatedArray[index] = {
      ...updatedArray[index],
      [field]: value,
    };

    setLocalData((prev) => ({
      ...prev,
      [section]: updatedArray,
    }));
    setUnsavedChanges(true);
  };

  // Add new item to array
  const handleAddArrayItem = (section: string, template: any) => {
    const updatedArray = [...localData[section]];
    const newId =
      updatedArray.length > 0
        ? Math.max(...updatedArray.map((item) => item.id)) + 1
        : 1;

    updatedArray.push({ ...template, id: newId });

    setLocalData((prev) => ({
      ...prev,
      [section]: updatedArray,
    }));
    setUnsavedChanges(true);
  };

  // Remove item from array
  const handleRemoveArrayItem = (section: string, id: number) => {
    const updatedArray = localData[section].filter((item: any) => item.id !== id);

    setLocalData((prev) => ({
      ...prev,
      [section]: updatedArray,
    }));
    setUnsavedChanges(true);
  };

  // Save all changes
  const handleSaveChanges = () => {
    try {
      updateSiteData(localData);
      setUnsavedChanges(false);
      toast.success("Changes saved successfully!");
    } catch (error) {
      toast.error("Failed to save changes");
      console.error("Save error:", error);
    }
  };

  // Handle logout
  const handleLogout = () => {
    if (unsavedChanges) {
      if (
        window.confirm(
          "You have unsaved changes. Are you sure you want to logout?"
        )
      ) {
        localStorage.removeItem("adminAuthenticated");
        navigate("/admin");
      }
    } else {
      localStorage.removeItem("adminAuthenticated");
      navigate("/admin");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <header className="sticky top-0 z-10 bg-white shadow-sm">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <div className="flex items-center space-x-4">
            {unsavedChanges && (
              <span className="text-sm text-ngo-orange">Unsaved changes</span>
            )}
            <Button
              onClick={handleSaveChanges}
              disabled={!unsavedChanges}
              className="flex items-center space-x-2 bg-ngo-green text-white hover:bg-ngo-green/90"
            >
              <Save size={18} />
              <span>Save Changes</span>
            </Button>
            <Button
              onClick={() => navigate("/")}
              variant="outline"
              className="flex items-center space-x-2"
            >
              <Home size={18} />
              <span>View Site</span>
            </Button>
            <Button
              onClick={handleLogout}
              variant="ghost"
              className="flex items-center space-x-2 text-gray-600 hover:text-ngo-red"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-5">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="sticky top-24 rounded-lg bg-white p-4 shadow-md">
              <h2 className="mb-4 border-b border-gray-200 pb-2 text-lg font-semibold">
                Dashboard
              </h2>
              <ul className="space-y-1">
                <li>
                  <button
                    onClick={() => setActiveTab("organization")}
                    className={`flex w-full items-center space-x-2 rounded-md px-3 py-2 text-left ${
                      activeTab === "organization"
                        ? "bg-ngo-orange/10 text-ngo-orange"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <Settings size={18} />
                    <span>Organization</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab("contact")}
                    className={`flex w-full items-center space-x-2 rounded-md px-3 py-2 text-left ${
                      activeTab === "contact"
                        ? "bg-ngo-orange/10 text-ngo-orange"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <Phone size={18} />
                    <span>Contact</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab("heroSlides")}
                    className={`flex w-full items-center space-x-2 rounded-md px-3 py-2 text-left ${
                      activeTab === "heroSlides"
                        ? "bg-ngo-orange/10 text-ngo-orange"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <LayoutDashboard size={18} />
                    <span>Hero Slides</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab("programs")}
                    className={`flex w-full items-center space-x-2 rounded-md px-3 py-2 text-left ${
                      activeTab === "programs"
                        ? "bg-ngo-orange/10 text-ngo-orange"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <LayoutDashboard size={18} />
                    <span>Programs</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab("gallery")}
                    className={`flex w-full items-center space-x-2 rounded-md px-3 py-2 text-left ${
                      activeTab === "gallery"
                        ? "bg-ngo-orange/10 text-ngo-orange"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <FileImage size={18} />
                    <span>Gallery</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab("testimonials")}
                    className={`flex w-full items-center space-x-2 rounded-md px-3 py-2 text-left ${
                      activeTab === "testimonials"
                        ? "bg-ngo-orange/10 text-ngo-orange"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <User size={18} />
                    <span>Testimonials</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab("team")}
                    className={`flex w-full items-center space-x-2 rounded-md px-3 py-2 text-left ${
                      activeTab === "team"
                        ? "bg-ngo-orange/10 text-ngo-orange"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <Users size={18} />
                    <span>Team</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab("faqs")}
                    className={`flex w-full items-center space-x-2 rounded-md px-3 py-2 text-left ${
                      activeTab === "faqs"
                        ? "bg-ngo-orange/10 text-ngo-orange"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <LayoutDashboard size={18} />
                    <span>FAQs</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab("impact")}
                    className={`flex w-full items-center space-x-2 rounded-md px-3 py-2 text-left ${
                      activeTab === "impact"
                        ? "bg-ngo-orange/10 text-ngo-orange"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <LayoutDashboard size={18} />
                    <span>Impact Numbers</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Content Area */}
          <div className="md:col-span-4">
            <div className="rounded-lg bg-white p-6 shadow-md">
              {/* Organization Section */}
              {activeTab === "organization" && (
                <div>
                  <h2 className="mb-6 text-2xl font-bold">Organization Information</h2>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-medium">
                        Organization Name
                      </label>
                      <Input
                        value={localData.organization.name}
                        onChange={(e) =>
                          handleChange("organization", "name", e.target.value)
                        }
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium">
                        Short Name
                      </label>
                      <Input
                        value={localData.organization.shortName}
                        onChange={(e) =>
                          handleChange("organization", "shortName", e.target.value)
                        }
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium">
                        Tagline
                      </label>
                      <Input
                        value={localData.organization.tagline}
                        onChange={(e) =>
                          handleChange("organization", "tagline", e.target.value)
                        }
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium">
                        Founded Year
                      </label>
                      <Input
                        type="number"
                        value={localData.organization.foundedYear}
                        onChange={(e) =>
                          handleChange(
                            "organization",
                            "foundedYear",
                            parseInt(e.target.value)
                          )
                        }
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="mb-2 block text-sm font-medium">
                        Description
                      </label>
                      <Textarea
                        value={localData.organization.description}
                        onChange={(e) =>
                          handleChange("organization", "description", e.target.value)
                        }
                        rows={4}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="mb-2 block text-sm font-medium">
                        Mission
                      </label>
                      <Textarea
                        value={localData.organization.mission}
                        onChange={(e) =>
                          handleChange("organization", "mission", e.target.value)
                        }
                        rows={3}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="mb-2 block text-sm font-medium">
                        Vision
                      </label>
                      <Textarea
                        value={localData.organization.vision}
                        onChange={(e) =>
                          handleChange("organization", "vision", e.target.value)
                        }
                        rows={3}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="mb-2 block text-sm font-medium">
                        Logo URL
                      </label>
                      <Input
                        value={localData.organization.logo}
                        onChange={(e) =>
                          handleChange("organization", "logo", e.target.value)
                        }
                        placeholder="Enter logo URL"
                      />
                      <div className="mt-2">
                        <img
                          src={localData.organization.logo}
                          alt="Logo"
                          className="h-16 w-auto"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Contact Information Section */}
              {activeTab === "contact" && (
                <div>
                  <h2 className="mb-6 text-2xl font-bold">Contact Information</h2>
                  
                  <div className="mb-6">
                    <h3 className="mb-4 text-xl font-semibold">Phone Numbers</h3>
                    <div className="space-y-3">
                      {localData.contact.phone.map((phone, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <Input
                            value={phone}
                            onChange={(e) => {
                              const updatedPhones = [...localData.contact.phone];
                              updatedPhones[index] = e.target.value;
                              handleChange("contact", "phone", updatedPhones);
                            }}
                          />
                          {localData.contact.phone.length > 1 && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-ngo-red hover:bg-ngo-red/10"
                              onClick={() => {
                                const updatedPhones = [...localData.contact.phone];
                                updatedPhones.splice(index, 1);
                                handleChange("contact", "phone", updatedPhones);
                              }}
                            >
                              <Trash2 size={18} />
                            </Button>
                          )}
                        </div>
                      ))}
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center space-x-2"
                        onClick={() => {
                          const updatedPhones = [...localData.contact.phone, ""];
                          handleChange("contact", "phone", updatedPhones);
                        }}
                      >
                        <PlusCircle size={16} />
                        <span>Add Phone</span>
                      </Button>
                    </div>
                  </div>

                  <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-medium">
                        WhatsApp
                      </label>
                      <Input
                        value={localData.contact.whatsapp}
                        onChange={(e) =>
                          handleChange("contact", "whatsapp", e.target.value)
                        }
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium">
                        Email
                      </label>
                      <Input
                        value={localData.contact.email}
                        onChange={(e) =>
                          handleChange("contact", "email", e.target.value)
                        }
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium">
                        Website
                      </label>
                      <Input
                        value={localData.contact.website}
                        onChange={(e) =>
                          handleChange("contact", "website", e.target.value)
                        }
                      />
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="mb-4 text-xl font-semibold">Address</h3>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div>
                        <label className="mb-2 block text-sm font-medium">
                          Line 1
                        </label>
                        <Input
                          value={localData.contact.address.line1}
                          onChange={(e) =>
                            handleNestedChange(
                              "contact",
                              "address",
                              "line1",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div>
                        <label className="mb-2 block text-sm font-medium">
                          Line 2
                        </label>
                        <Input
                          value={localData.contact.address.line2}
                          onChange={(e) =>
                            handleNestedChange(
                              "contact",
                              "address",
                              "line2",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div>
                        <label className="mb-2 block text-sm font-medium">
                          City
                        </label>
                        <Input
                          value={localData.contact.address.city}
                          onChange={(e) =>
                            handleNestedChange(
                              "contact",
                              "address",
                              "city",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div>
                        <label className="mb-2 block text-sm font-medium">
                          State
                        </label>
                        <Input
                          value={localData.contact.address.state}
                          onChange={(e) =>
                            handleNestedChange(
                              "contact",
                              "address",
                              "state",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div>
                        <label className="mb-2 block text-sm font-medium">
                          Pincode
                        </label>
                        <Input
                          value={localData.contact.address.pincode}
                          onChange={(e) =>
                            handleNestedChange(
                              "contact",
                              "address",
                              "pincode",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div>
                        <label className="mb-2 block text-sm font-medium">
                          Country
                        </label>
                        <Input
                          value={localData.contact.address.country}
                          onChange={(e) =>
                            handleNestedChange(
                              "contact",
                              "address",
                              "country",
                              e.target.value
                            )
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="mb-4 text-xl font-semibold">Social Media</h3>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div>
                        <label className="mb-2 block text-sm font-medium">
                          Facebook
                        </label>
                        <Input
                          value={localData.contact.socialMedia.facebook}
                          onChange={(e) =>
                            handleNestedChange(
                              "contact",
                              "socialMedia",
                              "facebook",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div>
                        <label className="mb-2 block text-sm font-medium">
                          Twitter
                        </label>
                        <Input
                          value={localData.contact.socialMedia.twitter}
                          onChange={(e) =>
                            handleNestedChange(
                              "contact",
                              "socialMedia",
                              "twitter",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div>
                        <label className="mb-2 block text-sm font-medium">
                          Instagram
                        </label>
                        <Input
                          value={localData.contact.socialMedia.instagram}
                          onChange={(e) =>
                            handleNestedChange(
                              "contact",
                              "socialMedia",
                              "instagram",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div>
                        <label className="mb-2 block text-sm font-medium">
                          LinkedIn
                        </label>
                        <Input
                          value={localData.contact.socialMedia.linkedin}
                          onChange={(e) =>
                            handleNestedChange(
                              "contact",
                              "socialMedia",
                              "linkedin",
                              e.target.value
                            )
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Hero Slides Section */}
              {activeTab === "heroSlides" && (
                <div>
                  <h2 className="mb-6 text-2xl font-bold">Hero Slides</h2>
                  
                  <div className="mb-6 flex justify-end">
                    <Button
                      onClick={() =>
                        handleAddArrayItem("heroSlides", {
                          id: 0,
                          title: "New Slide",
                          description: "Slide description goes here",
                          imageUrl: "/images/slider/education.jpg",
                          ctaText: "Learn More",
                          ctaLink: "/programs",
                        })
                      }
                      className="flex items-center space-x-2 bg-ngo-blue text-white hover:bg-ngo-blue/90"
                    >
                      <PlusCircle size={18} />
                      <span>Add New Slide</span>
                    </Button>
                  </div>
                  
                  <div className="space-y-6">
                    {localData.heroSlides.map((slide, index) => (
                      <div
                        key={slide.id}
                        className="rounded-lg border border-gray-200 p-4"
                      >
                        <div className="mb-4 flex items-center justify-between">
                          <h3 className="text-lg font-semibold">
                            Slide #{index + 1}: {slide.title}
                          </h3>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-ngo-red hover:bg-ngo-red/10"
                            onClick={() => handleRemoveArrayItem("heroSlides", slide.id)}
                          >
                            <Trash2 size={18} />
                          </Button>
                        </div>
                        
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                          <div>
                            <label className="mb-2 block text-sm font-medium">
                              Title
                            </label>
                            <Input
                              value={slide.title}
                              onChange={(e) =>
                                handleArrayItemChange(
                                  "heroSlides",
                                  index,
                                  "title",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                          <div className="md:col-span-2">
                            <label className="mb-2 block text-sm font-medium">
                              Description
                            </label>
                            <Textarea
                              value={slide.description}
                              onChange={(e) =>
                                handleArrayItemChange(
                                  "heroSlides",
                                  index,
                                  "description",
                                  e.target.value
                                )
                              }
                              rows={2}
                            />
                          </div>
                          <div>
                            <label className="mb-2 block text-sm font-medium">
                              Image URL
                            </label>
                            <Input
                              value={slide.imageUrl}
                              onChange={(e) =>
                                handleArrayItemChange(
                                  "heroSlides",
                                  index,
                                  "imageUrl",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                          <div>
                            <label className="mb-2 block text-sm font-medium">
                              Image Preview
                            </label>
                            <div className="h-20 w-full overflow-hidden rounded-md border border-gray-200">
                              <img
                                src={slide.imageUrl}
                                alt={slide.title}
                                className="h-full w-full object-cover"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="mb-2 block text-sm font-medium">
                              CTA Text
                            </label>
                            <Input
                              value={slide.ctaText}
                              onChange={(e) =>
                                handleArrayItemChange(
                                  "heroSlides",
                                  index,
                                  "ctaText",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                          <div>
                            <label className="mb-2 block text-sm font-medium">
                              CTA Link
                            </label>
                            <Input
                              value={slide.ctaLink}
                              onChange={(e) =>
                                handleArrayItemChange(
                                  "heroSlides",
                                  index,
                                  "ctaLink",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Programs Section */}
              {activeTab === "programs" && (
                <div>
                  <h2 className="mb-6 text-2xl font-bold">Programs</h2>
                  
                  <div className="mb-6 flex justify-end">
                    <Button
                      onClick={() =>
                        handleAddArrayItem("programs", {
                          id: 0,
                          title: "New Program",
                          description: "Program description goes here",
                          imageUrl: "/images/programs/education.jpg",
                          icon: "Activity",
                          achievements: "New achievement",
                          link: "/programs/new-program",
                        })
                      }
                      className="flex items-center space-x-2 bg-ngo-blue text-white hover:bg-ngo-blue/90"
                    >
                      <PlusCircle size={18} />
                      <span>Add New Program</span>
                    </Button>
                  </div>
                  
                  <div className="space-y-6">
                    {localData.programs.map((program, index) => (
                      <div
                        key={program.id}
                        className="rounded-lg border border-gray-200 p-4"
                      >
                        <div className="mb-4 flex items-center justify-between">
                          <h3 className="text-lg font-semibold">
                            {program.title}
                          </h3>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-ngo-red hover:bg-ngo-red/10"
                            onClick={() => handleRemoveArrayItem("programs", program.id)}
                          >
                            <Trash2 size={18} />
                          </Button>
                        </div>
                        
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                          <div>
                            <label className="mb-2 block text-sm font-medium">
                              Title
                            </label>
                            <Input
                              value={program.title}
                              onChange={(e) =>
                                handleArrayItemChange(
                                  "programs",
                                  index,
                                  "title",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                          <div className="md:col-span-2">
                            <label className="mb-2 block text-sm font-medium">
                              Description
                            </label>
                            <Textarea
                              value={program.description}
                              onChange={(e) =>
                                handleArrayItemChange(
                                  "programs",
                                  index,
                                  "description",
                                  e.target.value
                                )
                              }
                              rows={3}
                            />
                          </div>
                          <div>
                            <label className="mb-2 block text-sm font-medium">
                              Image URL
                            </label>
                            <Input
                              value={program.imageUrl}
                              onChange={(e) =>
                                handleArrayItemChange(
                                  "programs",
                                  index,
                                  "imageUrl",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                          <div>
                            <label className="mb-2 block text-sm font-medium">
                              Image Preview
                            </label>
                            <div className="h-20 w-full overflow-hidden rounded-md border border-gray-200">
                              <img
                                src={program.imageUrl}
                                alt={program.title}
                                className="h-full w-full object-cover"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="mb-2 block text-sm font-medium">
                              Icon
                            </label>
                            <Input
                              value={program.icon}
                              onChange={(e) =>
                                handleArrayItemChange(
                                  "programs",
                                  index,
                                  "icon",
                                  e.target.value
                                )
                              }
                              placeholder="Lucide icon name (e.g., Activity, BookOpen)"
                            />
                          </div>
                          <div>
                            <label className="mb-2 block text-sm font-medium">
                              Achievements
                            </label>
                            <Input
                              value={program.achievements}
                              onChange={(e) =>
                                handleArrayItemChange(
                                  "programs",
                                  index,
                                  "achievements",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                          <div>
                            <label className="mb-2 block text-sm font-medium">
                              Link
                            </label>
                            <Input
                              value={program.link}
                              onChange={(e) =>
                                handleArrayItemChange(
                                  "programs",
                                  index,
                                  "link",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Gallery Section */}
              {activeTab === "gallery" && (
                <div>
                  <h2 className="mb-6 text-2xl font-bold">Gallery</h2>
                  
                  <div className="mb-6 flex justify-end">
                    <Button
                      onClick={() =>
                        handleAddArrayItem("gallery", {
                          id: 0,
                          title: "New Image",
                          description: "Image description",
                          imageUrl: "/images/gallery/education-1.jpg",
                          category: "education",
                        })
                      }
                      className="flex items-center space-x-2 bg-ngo-blue text-white hover:bg-ngo-blue/90"
                    >
                      <PlusCircle size={18} />
                      <span>Add New Image</span>
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {localData.gallery.map((item, index) => (
                      <div
                        key={item.id}
                        className="rounded-lg border border-gray-200 p-4"
                      >
                        <div className="mb-4 flex items-center justify-between">
                          <h3 className="text-lg font-semibold">
                            {item.title}
                          </h3>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-ngo-red hover:bg-ngo-red/10"
                            onClick={() => handleRemoveArrayItem("gallery", item.id)}
                          >
                            <Trash2 size={18} />
                          </Button>
                        </div>
                        
                        <div className="mb-4 h-40 w-full overflow-hidden rounded-md border border-gray-200">
                          <img
                            src={item.imageUrl}
                            alt={item.title}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        
                        <div className="space-y-3">
                          <div>
                            <label className="mb-1 block text-sm font-medium">
                              Title
                            </label>
                            <Input
                              value={item.title}
                              onChange={(e) =>
                                handleArrayItemChange(
                                  "gallery",
                                  index,
                                  "title",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                          <div>
                            <label className="mb-1 block text-sm font-medium">
                              Description
                            </label>
                            <Input
                              value={item.description}
                              onChange={(e) =>
                                handleArrayItemChange(
                                  "gallery",
                                  index,
                                  "description",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                          <div>
                            <label className="mb-1 block text-sm font-medium">
                              Image URL
                            </label>
                            <Input
                              value={item.imageUrl}
                              onChange={(e) =>
                                handleArrayItemChange(
                                  "gallery",
                                  index,
                                  "imageUrl",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                          <div>
                            <label className="mb-1 block text-sm font-medium">
                              Category
                            </label>
                            <Input
                              value={item.category}
                              onChange={(e) =>
                                handleArrayItemChange(
                                  "gallery",
                                  index,
                                  "category",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Testimonials Section */}
              {activeTab === "testimonials" && (
                <div>
                  <h2 className="mb-6 text-2xl font-bold">Testimonials</h2>
                  
                  <div className="mb-6 flex justify-end">
                    <Button
                      onClick={() =>
                        handleAddArrayItem("testimonials", {
                          id: 0,
                          name: "New Person",
                          position: "Position",
                          quote: "Testimonial quote goes here",
                          imageUrl: "/images/testimonials/person1.jpg",
                        })
                      }
                      className="flex items-center space-x-2 bg-ngo-blue text-white hover:bg-ngo-blue/90"
                    >
                      <PlusCircle size={18} />
                      <span>Add New Testimonial</span>
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {localData.testimonials.map((testimonial, index) => (
                      <div
                        key={testimonial.id}
                        className="rounded-lg border border-gray-200 p-4"
                      >
                        <div className="mb-4 flex items-center justify-between">
                          <h3 className="text-lg font-semibold">
                            {testimonial.name}
                          </h3>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-ngo-red hover:bg-ngo-red/10"
                            onClick={() => handleRemoveArrayItem("testimonials", testimonial.id)}
                          >
                            <Trash2 size={18} />
                          </Button>
                        </div>
                        
                        <div className="mb-4 flex items-center space-x-3">
                          <div className="h-16 w-16 overflow-hidden rounded-full border border-gray-200">
                            <img
                              src={testimonial.imageUrl}
                              alt={testimonial.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div>
                            <h4 className="font-semibold">{testimonial.name}</h4>
                            <p className="text-sm text-gray-600">{testimonial.position}</p>
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          <div>
                            <label className="mb-1 block text-sm font-medium">
                              Name
                            </label>
                            <Input
                              value={testimonial.name}
                              onChange={(e) =>
                                handleArrayItemChange(
                                  "testimonials",
                                  index,
                                  "name",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                          <div>
                            <label className="mb-1 block text-sm font-medium">
                              Position
                            </label>
                            <Input
                              value={testimonial.position}
                              onChange={(e) =>
                                handleArrayItemChange(
                                  "testimonials",
                                  index,
                                  "position",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                          <div>
                            <label className="mb-1 block text-sm font-medium">
                              Quote
                            </label>
                            <Textarea
                              value={testimonial.quote}
                              onChange={(e) =>
                                handleArrayItemChange(
                                  "testimonials",
                                  index,
                                  "quote",
                                  e.target.value
                                )
                              }
                              rows={3}
                            />
                          </div>
                          <div>
                            <label className="mb-1 block text-sm font-medium">
                              Image URL
                            </label>
                            <Input
                              value={testimonial.imageUrl}
                              onChange={(e) =>
                                handleArrayItemChange(
                                  "testimonials",
                                  index,
                                  "imageUrl",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Team Section */}
              {activeTab === "team" && (
                <div>
                  <h2 className="mb-6 text-2xl font-bold">Team Members</h2>
                  
                  <div className="mb-6 flex justify-end">
                    <Button
                      onClick={() =>
                        handleAddArrayItem("team", {
                          id: 0,
                          name: "New Team Member",
                          position: "Position",
                          bio: "Team member bio goes here",
                          imageUrl: "/images/team/founder.jpg",
                          socialMedia: {
                            linkedin: "https://linkedin.com/in/new-member",
                            twitter: "https://twitter.com/new-member",
                          },
                        })
                      }
                      className="flex items-center space-x-2 bg-ngo-blue text-white hover:bg-ngo-blue/90"
                    >
                      <PlusCircle size={18} />
                      <span>Add New Team Member</span>
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {localData.team.map((member, index) => (
                      <div
                        key={member.id}
                        className="rounded-lg border border-gray-200 p-4"
                      >
                        <div className="mb-4 flex items-center justify-between">
                          <h3 className="text-lg font-semibold">
                            {member.name}
                          </h3>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-ngo-red hover:bg-ngo-red/10"
                            onClick={() => handleRemoveArrayItem("team", member.id)}
                          >
                            <Trash2 size={18} />
                          </Button>
                        </div>
                        
                        <div className="mb-4 flex items-center space-x-3">
                          <div className="h-20 w-20 overflow-hidden rounded-full border border-gray-200">
                            <img
                              src={member.imageUrl}
                              alt={member.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div>
                            <h4 className="font-semibold">{member.name}</h4>
                            <p className="text-sm text-gray-600">{member.position}</p>
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          <div>
                            <label className="mb-1 block text-sm font-medium">
                              Name
                            </label>
                            <Input
                              value={member.name}
                              onChange={(e) =>
                                handleArrayItemChange(
                                  "team",
                                  index,
                                  "name",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                          <div>
                            <label className="mb-1 block text-sm font-medium">
                              Position
                            </label>
                            <Input
                              value={member.position}
                              onChange={(e) =>
                                handleArrayItemChange(
                                  "team",
                                  index,
                                  "position",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                          <div>
                            <label className="mb-1 block text-sm font-medium">
                              Bio
                            </label>
                            <Textarea
                              value={member.bio}
                              onChange={(e) =>
                                handleArrayItemChange(
                                  "team",
                                  index,
                                  "bio",
                                  e.target.value
                                )
                              }
                              rows={3}
                            />
                          </div>
                          <div>
                            <label className="mb-1 block text-sm font-medium">
                              Image URL
                            </label>
                            <Input
                              value={member.imageUrl}
                              onChange={(e) =>
                                handleArrayItemChange(
                                  "team",
                                  index,
                                  "imageUrl",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                          
                          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                            <div>
                              <label className="mb-1 block text-sm font-medium">
                                LinkedIn
                              </label>
                              <Input
                                value={member.socialMedia.linkedin}
                                onChange={(e) => {
                                  const updatedSocialMedia = {
                                    ...member.socialMedia,
                                    linkedin: e.target.value,
                                  };
                                  handleArrayItemChange(
                                    "team",
                                    index,
                                    "socialMedia",
                                    updatedSocialMedia
                                  );
                                }}
                              />
                            </div>
                            <div>
                              <label className="mb-1 block text-sm font-medium">
                                Twitter
                              </label>
                              <Input
                                value={member.socialMedia.twitter}
                                onChange={(e) => {
                                  const updatedSocialMedia = {
                                    ...member.socialMedia,
                                    twitter: e.target.value,
                                  };
                                  handleArrayItemChange(
                                    "team",
                                    index,
                                    "socialMedia",
                                    updatedSocialMedia
                                  );
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* FAQs Section */}
              {activeTab === "faqs" && (
                <div>
                  <h2 className="mb-6 text-2xl font-bold">FAQs</h2>
                  
                  <div className="mb-6 flex justify-end">
                    <Button
                      onClick={() =>
                        handleAddArrayItem("faqs", {
                          id: 0,
                          question: "New Question",
                          answer: "Answer to the question goes here",
                        })
                      }
                      className="flex items-center space-x-2 bg-ngo-blue text-white hover:bg-ngo-blue/90"
                    >
                      <PlusCircle size={18} />
                      <span>Add New FAQ</span>
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    {localData.faqs.map((faq, index) => (
                      <div
                        key={faq.id}
                        className="rounded-lg border border-gray-200 p-4"
                      >
                        <div className="mb-4 flex items-center justify-between">
                          <h3 className="text-lg font-semibold truncate pr-4">
                            {faq.question}
                          </h3>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-ngo-red hover:bg-ngo-red/10"
                            onClick={() => handleRemoveArrayItem("faqs", faq.id)}
                          >
                            <Trash2 size={18} />
                          </Button>
                        </div>
                        
                        <div className="space-y-3">
                          <div>
                            <label className="mb-1 block text-sm font-medium">
                              Question
                            </label>
                            <Input
                              value={faq.question}
                              onChange={(e) =>
                                handleArrayItemChange(
                                  "faqs",
                                  index,
                                  "question",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                          <div>
                            <label className="mb-1 block text-sm font-medium">
                              Answer
                            </label>
                            <Textarea
                              value={faq.answer}
                              onChange={(e) =>
                                handleArrayItemChange(
                                  "faqs",
                                  index,
                                  "answer",
                                  e.target.value
                                )
                              }
                              rows={3}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Impact Numbers Section */}
              {activeTab === "impact" && (
                <div>
                  <h2 className="mb-6 text-2xl font-bold">Impact Numbers</h2>
                  
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-medium">
                        Beneficiaries
                      </label>
                      <Input
                        type="number"
                        value={localData.impact.beneficiaries}
                        onChange={(e) =>
                          handleNestedChange(
                            "impact",
                            "beneficiaries",
                            "",
                            parseInt(e.target.value)
                          )
                        }
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium">
                        Villages
                      </label>
                      <Input
                        type="number"
                        value={localData.impact.villages}
                        onChange={(e) =>
                          handleNestedChange(
                            "impact",
                            "villages",
                            "",
                            parseInt(e.target.value)
                          )
                        }
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium">
                        Programs
                      </label>
                      <Input
                        type="number"
                        value={localData.impact.programs}
                        onChange={(e) =>
                          handleNestedChange(
                            "impact",
                            "programs",
                            "",
                            parseInt(e.target.value)
                          )
                        }
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium">
                        Volunteers
                      </label>
                      <Input
                        type="number"
                        value={localData.impact.volunteers}
                        onChange={(e) =>
                          handleNestedChange(
                            "impact",
                            "volunteers",
                            "",
                            parseInt(e.target.value)
                          )
                        }
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
