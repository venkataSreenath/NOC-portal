"use client";

import { useEffect, useState } from "react";
import { getCurrentUser } from "@/lib/auth";
import { IFacultyAdvisor } from "@/types/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Mail, MapPin, Building2, GraduationCap } from "lucide-react";

export function ProfileCard() {
  const [user, setUser] = useState<IFacultyAdvisor | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser as IFacultyAdvisor);
      } catch (error) {
        console.error("Failed to load user profile:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <Card className="border-border bg-card">
        <CardContent className="p-6">
          <div className="text-sm text-foreground-muted">Loading profile...</div>
        </CardContent>
      </Card>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-foreground">My Profile</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-4">{user.name}</h3>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <Mail className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs text-foreground-muted uppercase tracking-wide mb-1">Email</p>
              <p className="text-foreground font-medium">{user.email}</p>
            </div>
          </div>

          {user.phoneNumber && (
            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs text-foreground-muted uppercase tracking-wide mb-1">Phone Number</p>
                <p className="text-foreground font-medium">{user.phoneNumber}</p>
              </div>
            </div>
          )}

          {user.address && (
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs text-foreground-muted uppercase tracking-wide mb-1">Address</p>
                <p className="text-foreground font-medium">{user.address}</p>
              </div>
            </div>
          )}

          <div className="flex items-start gap-3">
            <Building2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs text-foreground-muted uppercase tracking-wide mb-1">Department</p>
              <p className="text-foreground font-medium">{user.department}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <GraduationCap className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs text-foreground-muted uppercase tracking-wide mb-1">Program</p>
              <p className="text-foreground font-medium">{user.program}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

