const fs = require('fs');
const path = require('path');

const replacements = {
  'src/components/DashboardStaffList.tsx': [
    {
      target: `      {/* Header Row */}
      <div className="flex items-center justify-between mb-[40px] select-none w-full">
        <div className="flex flex-col gap-[2px]">
          <h1 className="text-base font-medium text-[#0F1E35] leading-6">Staff</h1>
          <p className="text-xs text-[#6B7280] leading-[18px]">Team members, hours, and service assignments</p>
        </div>

        <NotificationBell />
      </div>`,
      replacement: `      <DashboardHeader title="Staff" subtitle="Team members, hours, and service assignments" />`
    },
    {
      target: `        {/* Header Row */}
        <div className="flex items-center justify-between mb-[40px] select-none w-full">
          <div className="flex flex-col gap-[2px]">
            <h1 className="text-base font-semibold text-[#0F1E35] leading-6">
              {editingStaffId !== null ? "Edit staff" : "Add staff"}
            </h1>
            <p className="text-xs text-[#6B7280] leading-[18px]">
              {editingStaffId !== null ? "Edit staff info" : "Add new staff to your team"}
            </p>
          </div>

          <NotificationBell />
        </div>`,
      replacement: `        <DashboardHeader title={editingStaffId !== null ? "Edit staff" : "Add staff"} subtitle={editingStaffId !== null ? "Edit staff info" : "Add new staff to your team"} />`
    }
  ],
  'src/components/DashboardSettings.tsx': [
    {
      target: `      {/* Dashboard Header Title Row */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 w-full">
        <div className="flex flex-col select-none">
          <h1 className="text-2xl font-semibold text-[#0F1E35] font-poppins">Settings</h1>
          <p className="text-xs text-neutral-500 font-poppins mt-0.5">
            Update your photo and personal details.
          </p>
        </div>

        <NotificationBell />
      </div>`,
      replacement: `      <DashboardHeader title="Settings" subtitle="Update your photo and personal details." />`
    }
  ],
  'src/components/DashboardReviewsList.tsx': [
    {
      target: `      {/* Dashboard Header Title Row */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 w-full mb-8">
        <div className="flex flex-col select-none">
          <h1 className="text-2xl font-semibold text-[#0F1E35] font-poppins">Reviews</h1>
          <p className="text-xs text-neutral-500 font-poppins mt-0.5">Reviews and ratings from your clients</p>
        </div>

        <NotificationBell />
      </div>`,
      replacement: `      <DashboardHeader title="Reviews" subtitle="Reviews and ratings from your clients" />`
    }
  ],
  'src/components/DashboardServicesList.tsx': [
    {
      target: `      {/* Header Row */}
      <div className="flex items-center justify-between mb-5 select-none w-full">
        <div className="flex flex-col gap-0.5">
          <h1 className="text-base font-semibold text-[#0F1E35] leading-6">Services</h1>
          <p className="text-xs text-[#6B7280] leading-[18px]">Manage your services, pricing, and durations</p>
        </div>

        <NotificationBell />
      </div>`,
      replacement: `      <DashboardHeader title="Services" subtitle="Manage your services, pricing, and durations" />`
    },
    {
      target: `        {/* Header Row */}
        <div className="flex items-center justify-between mb-5 select-none w-full">
          <div className="flex flex-col gap-0.5">
            <h1 className="text-base font-semibold text-[#0F1E35] leading-6">
              {editingServiceId !== null ? "Edit service" : "Create service"}
            </h1>
            <p className="text-xs text-[#6B7280] leading-[18px]">
              {editingServiceId !== null ? "Edit your service details" : "Add a new service to your menu"}
            </p>
          </div>

          <NotificationBell />
        </div>`,
      replacement: `        <DashboardHeader title={editingServiceId !== null ? "Edit service" : "Create service"} subtitle={editingServiceId !== null ? "Edit your service details" : "Add a new service to your menu"} />`
    }
  ],
  'src/components/DashboardPayoutsList.tsx': [
    {
      target: `      {/* Dashboard Header Title Row */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 w-full mb-8">
        <div className="flex flex-col select-none">
          <h1 className="text-2xl font-semibold text-[#0F1E35] font-poppins">Payouts & Finance</h1>
          <p className="text-xs text-neutral-500 font-poppins mt-0.5">Manage your earnings, payouts, and bank details</p>
        </div>

        <NotificationBell />
      </div>`,
      replacement: `      <DashboardHeader title="Payouts & Finance" subtitle="Manage your earnings, payouts, and bank details" />`
    }
  ],
  'src/components/DashboardOverview.tsx': [
    {
      target: `      {/* Dashboard Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-[#0F1E35] font-poppins">Dashboard</h1>
          <p className="text-xs text-neutral-500 font-poppins mt-0.5">Wednesday, 27 May 2026 · Good morning, Elena</p>
        </div>

        <div className="flex flex-col items-end gap-3">
          {/* Bell Icon Notification Button */}
          <NotificationBell />
        </div>
      </div>`,
      replacement: `      <DashboardHeader title="Dashboard" subtitle="Wednesday, 27 May 2026 · Good morning, Elena" />`
    }
  ],
  'src/components/DashboardCreateBusiness.tsx': [
    {
      target: `        {/* Header Row */}
        <div className="flex items-center justify-between mb-6 select-none w-full">
          <div className="flex flex-col gap-0.5">
            <h1 className="text-base font-semibold text-[#0F1E35] leading-6">Create business</h1>
            <p className="text-xs text-[#6B7280] leading-[18px]">Set up your business profile</p>
          </div>

          <NotificationBell />
        </div>`,
      replacement: `        <DashboardHeader title="Create business" subtitle="Set up your business profile" />`
    },
    {
      target: `      {/* Header Row */}
      <div className="flex items-center justify-between mb-6 select-none w-full">
        <div className="flex flex-col gap-0.5">
          <h1 className="text-base font-semibold text-[#0F1E35] leading-6">Business Profile</h1>
          <p className="text-xs text-[#6B7280] leading-[18px]">Create and manage your business profiles</p>
        </div>

        <NotificationBell />
      </div>`,
      replacement: `      <DashboardHeader title="Business Profile" subtitle="Create and manage your business profiles" />`
    }
  ],
  'src/components/DashboardBookingsList.tsx': [
    {
      target: `      {/* Dashboard Header Title Row */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 w-full mb-8">
        <div className="flex flex-col select-none">
          <h1 className="text-2xl font-semibold text-[#0F1E35] font-poppins">Bookings</h1>
          <p className="text-xs text-neutral-500 font-poppins mt-0.5">Wednesday, 27 May 2026 · Good morning, Elena</p>
        </div>

        <NotificationBell />
      </div>`,
      replacement: `      <DashboardHeader title={activeTab === "Upcoming" ? "Upcoming bookings" : activeTab === "Completed" ? "Completed bookings" : "Cancelled bookings"} subtitle="Wednesday, 27 May 2026 · Good morning, Elena" />`
    }
  ],
  'src/components/DashboardBusinessProfile.tsx': [
    {
      target: `      {/* Dashboard Header Title Row */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 w-full mb-8">
        <div className="flex flex-col select-none">
          <h1 className="text-2xl font-semibold text-[#0F1E35] font-poppins">Business Profile</h1>
          <p className="text-xs text-neutral-500 font-poppins mt-0.5">Create and manage your business profiles</p>
        </div>

        <NotificationBell />
      </div>`,
      replacement: `      <DashboardHeader title="Business Profile" subtitle="Create and manage your business profiles" />`
    }
  ],
  'src/components/DashboardBookingForm.tsx': [
    {
      target: `      {/* Dashboard Header Title Row */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 w-full mb-[40px]">
        <div className="flex flex-col select-none">
          <h1 className="text-2xl font-semibold text-[#0F1E35] font-poppins">
            {editingBookingIndex !== null ? "Edit booking" : "Create booking"}
          </h1>
          <p className="text-xs text-neutral-500 font-poppins mt-0.5">
            {editingBookingIndex !== null ? "Modify details of the booking" : "Add a new booking manually to your calendar"}
          </p>
        </div>

        <NotificationBell />
      </div>`,
      replacement: `      <DashboardHeader title={editingBookingIndex !== null ? "Edit booking" : "Create booking"} subtitle={editingBookingIndex !== null ? "Modify details of the booking" : "Add a new booking manually to your calendar"} />`
    }
  ],
  'src/components/DashboardAnalytics.tsx': [
    {
      target: `      {/* Dashboard Header Title Row */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 w-full mb-8">
        <div className="flex flex-col select-none">
          <h1 className="text-2xl font-semibold text-[#0F1E35] font-poppins">Analytics</h1>
          <p className="text-xs text-neutral-500 font-poppins mt-0.5">Wednesday, 27 May 2026 · Good morning, Elena</p>
        </div>

        <NotificationBell />
      </div>`,
      replacement: `      <DashboardHeader title="Analytics" subtitle="Wednesday, 27 May 2026 · Good morning, Elena" />`
    }
  ],
  'src/components/DashboardAddonsList.tsx': [
    {
      target: `      {/* Header Row */}
      <div className="flex items-center justify-between mb-5 select-none w-full">
        <div className="flex flex-col gap-0.5">
          <h1 className="text-base font-semibold text-[#0F1E35] leading-6">Add-ons</h1>
          <p className="text-xs text-[#6B7280] leading-[18px]">Manage extra services clients can add to bookings</p>
        </div>

        <NotificationBell />
      </div>`,
      replacement: `      <DashboardHeader title="Add-ons" subtitle="Manage extra services clients can add to bookings" />`
    },
    {
      target: `        {/* Header Row */}
        <div className="flex items-center justify-between mb-5 select-none w-full">
          <div className="flex flex-col gap-0.5">
            <h1 className="text-base font-semibold text-[#0F1E35] leading-6">
              {editingAddonId !== null ? "Edit add-on" : "Create add-on"}
            </h1>
            <p className="text-xs text-[#6B7280] leading-[18px]">
              {editingAddonId !== null ? "Edit your add-on details" : "Add a new add-on to your menu"}
            </p>
          </div>

          <NotificationBell />
        </div>`,
      replacement: `        <DashboardHeader title={editingAddonId !== null ? "Edit add-on" : "Create add-on"} subtitle={editingAddonId !== null ? "Edit your add-on details" : "Add a new add-on to your menu"} />`
    }
  ],
  'src/components/clients/ClientForm.tsx': [
    {
      target: `      {/* Client Add/Edit Header */}
      <div className="h-16 border-b border-[#C6C6CB] bg-[#FCF8F8] px-6 flex items-center justify-between shrink-0 select-none">
        <div>
          <h1 className="text-xl font-bold text-[#1A1A1A] font-poppins">
            {editingClientIndex !== null ? "Edit Client" : "Add Client"}
          </h1>
          <p className="text-[11px] text-neutral-500 font-poppins mt-0.5">
            {editingClientIndex !== null ? "Update client info in your system" : "Create new client info in your system"}
          </p>
        </div>
        <NotificationBell />
      </div>`,
      replacement: `      <DashboardHeader title={editingClientIndex !== null ? "Edit Client" : "Add Client"} subtitle={editingClientIndex !== null ? "Update client info in your system" : "Create new client info in your system"} />`
    }
  ],
  'src/components/clients/ClientDetails.tsx': [
    {
      target: `      {/* Client Info Header */}
      <div className="h-16 border-b border-[#C6C6CB] bg-[#FCF8F8] px-6 flex items-center justify-between shrink-0 select-none">
        <div>
          <h1 className="text-xl font-bold text-[#1A1A1A] font-poppins">Client Info</h1>
          <p className="text-[11px] text-neutral-500 font-poppins mt-0.5">View client information in details</p>
        </div>
        <NotificationBell />
      </div>`,
      replacement: `      <DashboardHeader title="Client Info" subtitle="View client information in details" />`
    }
  ]
};

Object.keys(replacements).forEach(file => {
  const filePath = path.join(__dirname, file);
  if (!fs.existsSync(filePath)) return;

  let content = fs.readFileSync(filePath, 'utf8');
  let replaced = false;

  replacements[file].forEach(chunk => {
    // Normalize target line endings
    const targetLF = chunk.target.replace(/\r\n/g, '\n');
    const targetCRLF = chunk.target.replace(/\r\n/g, '\n').replace(/\n/g, '\r\n');

    if (content.includes(targetLF)) {
      content = content.replace(targetLF, chunk.replacement);
      replaced = true;
    } else if (content.includes(targetCRLF)) {
      content = content.replace(targetCRLF, chunk.replacement);
      replaced = true;
    }
  });

  if (replaced) {
    // Add import statement for DashboardHeader
    if (!content.includes('import DashboardHeader')) {
      const useClientIdx = content.indexOf('"use client";');
      if (useClientIdx !== -1) {
        const insertPos = useClientIdx + '"use client";'.length;
        content = content.slice(0, insertPos) + '\nimport DashboardHeader from "@/components/DashboardHeader";' + content.slice(insertPos);
      } else {
        content = 'import DashboardHeader from "@/components/DashboardHeader";\n' + content;
      }
    }
    // Remove now-unused NotificationBell import
    content = content.replace(/import NotificationBell from "@\/components\/notifications\/NotificationBell";\n?/g, '');

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Standardized: ${file}`);
  } else {
    console.log(`No match for chunks in: ${file}`);
  }
});
