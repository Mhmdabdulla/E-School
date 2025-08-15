import { useEffect, useState } from "react";
import { useAppSelector } from "../../redux/store";
import {type Certificate } from "../../types/certificate";
import { getUserCertificates, downloadCertificate } from "../../services/certificateService";
import { toast } from "sonner";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../../components/ui/card";
import { Download, Loader2 } from "lucide-react";
import { formatDate } from "../../lib/utils/formatDate";
import {type Course } from "../../types/course";

export default function CertificatesPage() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [downloading, setDownloading] = useState<string | null>(null);

  const user = useAppSelector(state => state.auth.user)

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const data = await getUserCertificates();
        console.log(data.certificates)
        setCertificates(data.certificates);
        setLoading(false);
      } catch (error) {
        toast.error((error as Error).message);
        setLoading(false);
      }
    };

      fetchCertificates();
  }, []);

  const handleDownload = async (certificate: Certificate) => {
    setDownloading(certificate._id);
    try {
      await downloadCertificate(certificate.certificateUrl);
      toast.success("Certificate downloaded successfully");
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setDownloading(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="">
      <div className="container mx-auto px-4 py-8">
        {/* <h1 className="text-3xl font-bold mb-8">My Certificates</h1> */}
        {certificates.length === 0 ? (
            <div className="flex justify-center ">
                <div className="text-muted-foreground py-20">You have not earned any certificates yet.</div>
            </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificates.map((certificate) => {
            const course = certificate.courseId as Course
            return (
                <Card key={certificate._id} className="flex flex-col">
                  <CardHeader>
                    <CardTitle>{course.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Certificate ID: {certificate.certificateId}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Issued to: {user.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Issued on: {formatDate(certificate.issuedAt)}
                    </p>
                  </CardContent>
                  <CardFooter className="mt-auto">
                    <Button
                      variant="secondary"
                      className="w-full"
                      onClick={() => handleDownload(certificate)}
                      disabled={downloading === certificate._id}
                    >
                      {downloading === certificate._id ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Downloading...
                        </>
                      ) : (
                        <>
                          <Download className="mr-2 h-4 w-4" />
                          Download Certificate
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              )
            }
            )}
          </div>
        )}
      </div>
    </div>
  );
}