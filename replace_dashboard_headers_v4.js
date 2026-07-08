const fs = require('fs');
const path = require('path');

const files = [
  'src/components/DashboardStaffList.tsx',
  'src/components/DashboardSettings.tsx',
  'src/components/DashboardReviewsList.tsx',
  'src/components/DashboardServicesList.tsx',
  'src/components/DashboardPayoutsList.tsx',
  'src/components/DashboardOverview.tsx',
  'src/components/DashboardCreateBusiness.tsx',
  'src/components/DashboardBookingsList.tsx',
  'src/components/DashboardBusinessProfile.tsx',
  'src/components/DashboardBookingForm.tsx',
  'src/components/DashboardAnalytics.tsx',
  'src/components/DashboardAddonsList.tsx',
  'src/components/clients/ClientForm.tsx',
  'src/components/clients/ClientDetails.tsx'
];

files.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (!fs.existsSync(filePath)) return;

  let content = fs.readFileSync(filePath, 'utf8');
  let replaced = false;

  // Overrides for special files
  if (file.includes('DashboardOverview.tsx')) {
    const overviewRegex = /<div className="flex items-center justify-between mb-8">[\s\S]*?<h1>Dashboard<\/h1>[\s\S]*?<\/div>[\s\S]*?<div className="flex flex-col items-end gap-3">[\s\S]*?<NotificationBell \/>([\s\S]*?)<\/div>[\s\S]*?<\/div>/i;
    if (content.match(overviewRegex)) {
      content = content.replace(overviewRegex, (match, extra) => {
        return `<DashboardHeader title="Dashboard" subtitle="Wednesday, 27 May 2026 · Good morning, Elena" />\n<div className="flex justify-end mb-6">${extra}</div>`;
      });
      replaced = true;
    }
  }

  if (file.includes('DashboardSettings.tsx')) {
    const settingsRegex = /<div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 w-full">[\s\S]*?<h1>Settings<\/h1>[\s\S]*?<\/div>[\s\S]*?<div className="relative shrink-0">[\s\S]*?<NotificationBell \/>[\s\S]*?<\/div>[\s\S]*?<\/div>/i;
    if (content.match(settingsRegex)) {
      content = content.replace(settingsRegex, '<DashboardHeader title="Settings" subtitle="Update your photo and personal details." />');
      replaced = true;
    }
  }

  // Generalized Regex
  const regex = /<div className="flex[^"]*(?:items-center|justify-between)[^"]*">[\s\S]*?<div className="flex flex-col[^"]*">[\s\S]*?<h1[^>]*>([\s\S]*?)<\/h1>[\s\S]*?<p[^>]*>([\s\S]*?)<\/p>[\s\S]*?<\/div>[\s\S]*?<NotificationBell \/>[\s\S]*?<\/div>/i;
  const regexAlt = /<div className="flex[^"]*(?:items-center|justify-between)[^"]*">[\s\S]*?<div>[\s\S]*?<h1[^>]*>([\s\S]*?)<\/h1>[\s\S]*?<p[^>]*>([\s\S]*?)<\/p>[\s\S]*?<\/div>[\s\S]*?<NotificationBell \/>[\s\S]*?<\/div>/i;

  const formatAttr = (val) => {
    val = val.trim();
    // Strip braces if already wrapped
    if (val.startsWith('{') && val.endsWith('}')) {
      val = val.slice(1, -1).trim();
    }
    // Check if it is a JS expression
    if (val.includes('?') || val.includes(':') || val.includes('activeTab') || val.includes('editing')) {
      return `{${val}}`;
    }
    // Remove outer quotes if present to avoid double quoting
    if (val.startsWith('"') && val.endsWith('"')) {
      val = val.slice(1, -1);
    }
    return `"${val}"`;
  };

  if (!replaced && content.match(regex)) {
    content = content.replace(regex, (match, title, subtitle) => {
      replaced = true;
      return `<DashboardHeader title=${formatAttr(title)} subtitle=${formatAttr(subtitle)} />`;
    });
  }

  if (!replaced && content.match(regexAlt)) {
    content = content.replace(regexAlt, (match, title, subtitle) => {
      replaced = true;
      return `<DashboardHeader title=${formatAttr(title)} subtitle=${formatAttr(subtitle)} />`;
    });
  }

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
    console.log(`No pattern matched for: ${file}`);
  }
});
