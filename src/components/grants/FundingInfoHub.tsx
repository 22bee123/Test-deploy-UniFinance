
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { 
  BookOpen, ExternalLink, GraduationCap, University, 
  FileText, PoundSterling
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const FundingInfoHub = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold mb-1">UK Funding Information Hub</h2>
        <p className="text-sm text-muted-foreground">
          Comprehensive guides to understand UK student funding options
        </p>
      </div>

      <Tabs defaultValue="guides">
        <TabsList className="mb-4">
          <TabsTrigger value="guides">Funding Guides</TabsTrigger>
          <TabsTrigger value="eligibility">Eligibility Explainers</TabsTrigger>
          <TabsTrigger value="timelines">Application Timelines</TabsTrigger>
          <TabsTrigger value="faqs">FAQs</TabsTrigger>
        </TabsList>

        <TabsContent value="guides" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Student Finance Guide */}
            <Card className="hover:border-uni-purple-300 transition-all">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg">Student Finance Guide</CardTitle>
                  <div className="bg-uni-purple-100 p-2 rounded-full">
                    <GraduationCap className="h-5 w-5 text-uni-purple-600" />
                  </div>
                </div>
                <CardDescription>
                  Understanding loans, grants and repayments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-muted-foreground mb-4">
                  <p>Learn about the different types of student finance available in England, Wales, Scotland and Northern Ireland.</p>
                </div>
                <Button variant="outline" className="w-full">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Read Guide
                </Button>
              </CardContent>
            </Card>

            {/* University Bursaries */}
            <Card className="hover:border-uni-purple-300 transition-all">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg">University Bursaries</CardTitle>
                  <div className="bg-uni-purple-100 p-2 rounded-full">
                    <University className="h-5 w-5 text-uni-purple-600" />
                  </div>
                </div>
                <CardDescription>
                  Institution-specific financial support
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-muted-foreground mb-4">
                  <p>Navigate the various bursaries and scholarships offered directly by UK universities and colleges.</p>
                </div>
                <Button variant="outline" className="w-full">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Read Guide
                </Button>
              </CardContent>
            </Card>

            {/* Charitable Trust Grants */}
            <Card className="hover:border-uni-purple-300 transition-all">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg">Charitable Trust Grants</CardTitle>
                  <div className="bg-uni-purple-100 p-2 rounded-full">
                    <PoundSterling className="h-5 w-5 text-uni-purple-600" />
                  </div>
                </div>
                <CardDescription>
                  Non-governmental funding sources
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-muted-foreground mb-4">
                  <p>Discover the wide range of charitable trusts and foundations that provide grants to UK students.</p>
                </div>
                <Button variant="outline" className="w-full">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Read Guide
                </Button>
              </CardContent>
            </Card>

            {/* Research Council Funding */}
            <Card className="hover:border-uni-purple-300 transition-all">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg">Research Council Funding</CardTitle>
                  <div className="bg-uni-purple-100 p-2 rounded-full">
                    <FileText className="h-5 w-5 text-uni-purple-600" />
                  </div>
                </div>
                <CardDescription>
                  Postgraduate research funding options
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-muted-foreground mb-4">
                  <p>Understand the UK Research Councils and how they fund postgraduate research across different fields.</p>
                </div>
                <Button variant="outline" className="w-full">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Read Guide
                </Button>
              </CardContent>
            </Card>

            {/* International Student Options */}
            <Card className="hover:border-uni-purple-300 transition-all">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg">International Student Options</CardTitle>
                  <div className="bg-uni-purple-100 p-2 rounded-full">
                    <GraduationCap className="h-5 w-5 text-uni-purple-600" />
                  </div>
                </div>
                <CardDescription>
                  Funding for non-UK students
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-muted-foreground mb-4">
                  <p>Explore scholarships and funding sources specifically available for international students in the UK.</p>
                </div>
                <Button variant="outline" className="w-full">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Read Guide
                </Button>
              </CardContent>
            </Card>

            {/* Specialist Funding */}
            <Card className="hover:border-uni-purple-300 transition-all">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg">Specialist Funding</CardTitle>
                  <div className="bg-uni-purple-100 p-2 rounded-full">
                    <PoundSterling className="h-5 w-5 text-uni-purple-600" />
                  </div>
                </div>
                <CardDescription>
                  NHS, social work and teacher training
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-muted-foreground mb-4">
                  <p>Learn about dedicated funding for healthcare, social work, teaching and other specialist professions.</p>
                </div>
                <Button variant="outline" className="w-full">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Read Guide
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="eligibility" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Eligibility Criteria Explainers</CardTitle>
              <CardDescription>
                Understand the requirements for different funding types
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Student Finance Eligibility</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4 text-sm">
                      <p>To be eligible for Student Finance in the UK, you generally need to:</p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Be a UK national or have 'settled status'</li>
                        <li>Normally live in the UK</li>
                        <li>Have been living in the UK for 3 years before starting your course</li>
                        <li>Be studying at an eligible course at an eligible university or college</li>
                      </ul>
                      <p className="text-muted-foreground">
                        Eligibility can vary between England, Scotland, Wales, and Northern Ireland. 
                        Additional support may be available based on your circumstances.
                      </p>
                      <Button variant="link" className="p-0">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Full eligibility details
                      </Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger>Means-Tested Bursaries</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4 text-sm">
                      <p>
                        Means-tested bursaries assess your household income to determine eligibility.
                        Generally, your household income must fall below certain thresholds:
                      </p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Below £25,000 - Full bursary often available</li>
                        <li>£25,001 - £42,875 - Partial bursary may be available</li>
                        <li>Above £42,875 - Usually not eligible, but varies by institution</li>
                      </ul>
                      <p className="text-muted-foreground">
                        You'll typically need to consent to sharing your household income information 
                        from Student Finance with your university or college.
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger>Merit-Based Scholarships</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4 text-sm">
                      <p>
                        Merit-based scholarships are awarded based on academic excellence, special talents, 
                        or achievements. Common eligibility criteria include:
                      </p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Academic scholarships: Typically require AAA at A-Level or equivalent, or a First/2:1 for postgraduate study</li>
                        <li>Talent-based: Excellence in sports, music, arts, or other fields with demonstrated achievements</li>
                        <li>Leadership: Evidence of leadership roles, community involvement, or exceptional extracurricular activities</li>
                      </ul>
                      <p className="text-muted-foreground">
                        Application processes often require personal statements, references, portfolios, 
                        or interviews depending on the scholarship type.
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4">
                  <AccordionTrigger>Hardship Funds</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4 text-sm">
                      <p>
                        Hardship funds are available to students experiencing financial difficulties. 
                        Eligibility typically requires:
                      </p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Evidence of financial hardship or unexpected financial circumstances</li>
                        <li>Demonstration that you've applied for all other available funding</li>
                        <li>Full-time student status (though some part-time students may be eligible)</li>
                        <li>Satisfactory academic progress</li>
                      </ul>
                      <p className="text-muted-foreground">
                        Applications usually require documentation of your financial situation and 
                        are assessed on a case-by-case basis.
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5">
                  <AccordionTrigger>Postgraduate Research Funding</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4 text-sm">
                      <p>
                        For Research Council funding and other postgraduate research grants, eligibility typically includes:
                      </p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>A First or 2:1 undergraduate degree in a relevant subject</li>
                        <li>UK residency status for full funding (international students may receive partial funding)</li>
                        <li>A research proposal that aligns with the funding body's priorities</li>
                        <li>Acceptance onto a qualifying research program at an eligible institution</li>
                      </ul>
                      <p className="text-muted-foreground">
                        Competition for research funding is intense, with academic excellence, research 
                        potential, and project quality being key selection factors.
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="timelines" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Application Timelines</CardTitle>
              <CardDescription>Key dates for UK student funding applications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-3">Student Finance Timeline</h3>
                  <div className="relative">
                    <div className="absolute top-0 left-0 w-1 h-full bg-gray-200"></div>
                    
                    <div className="relative pl-8 pb-8">
                      <div className="absolute left-0 p-1.5 bg-uni-purple-500 rounded-full"></div>
                      <h4 className="font-medium">February</h4>
                      <p className="text-sm text-muted-foreground">
                        Student Finance applications open for the upcoming academic year
                      </p>
                    </div>
                    
                    <div className="relative pl-8 pb-8">
                      <div className="absolute left-0 p-1.5 bg-uni-purple-500 rounded-full"></div>
                      <h4 className="font-medium">May</h4>
                      <p className="text-sm text-muted-foreground">
                        Deadline for Student Finance if you want your funding in place for the start of term
                      </p>
                    </div>
                    
                    <div className="relative pl-8 pb-8">
                      <div className="absolute left-0 p-1.5 bg-uni-purple-500 rounded-full"></div>
                      <h4 className="font-medium">September</h4>
                      <p className="text-sm text-muted-foreground">
                        Final deadline to apply for Student Finance (up to 9 months after your course starts)
                      </p>
                    </div>
                    
                    <div className="relative pl-8">
                      <div className="absolute left-0 p-1.5 bg-uni-purple-500 rounded-full"></div>
                      <h4 className="font-medium">January</h4>
                      <p className="text-sm text-muted-foreground">
                        Deadline to update your income details for the current academic year
                      </p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-3">University Bursaries & Scholarships</h3>
                  <div className="text-sm space-y-1 text-muted-foreground">
                    <p>
                      University-specific bursaries and scholarships have varying deadlines throughout the year.
                      Most academic scholarships have these typical timeframes:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 mt-2">
                      <li><span className="font-medium text-foreground">January-March:</span> Early application deadlines for scholarships</li>
                      <li><span className="font-medium text-foreground">June-July:</span> Second round of scholarship applications</li>
                      <li><span className="font-medium text-foreground">September-October:</span> Final scholarship deadlines and automatic bursary assessments</li>
                      <li><span className="font-medium text-foreground">November-January:</span> Hardship fund applications open</li>
                    </ul>
                    <p className="mt-2">
                      Check with individual universities for their specific deadlines, as they can vary significantly.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="faqs" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>Common queries about UK student funding</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>How much Student Finance can I get?</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-3 text-sm">
                      <p>
                        The amount of Student Finance you can receive depends on several factors:
                      </p>
                      <ul className="list-disc pl-6 space-y-1">
                        <li><span className="font-medium">Tuition Fee Loan:</span> Up to £9,250 per year for full-time students at most universities.</li>
                        <li><span className="font-medium">Maintenance Loan:</span> Between £3,597 and £12,667 per year depending on your household income, where you live, and where you study.</li>
                        <li><span className="font-medium">Additional Support:</span> Extra funding is available if you have dependants, disabilities, or qualify for other specific criteria.</li>
                      </ul>
                      <p className="text-muted-foreground mt-2">
                        Use the Student Finance calculator on GOV.UK to get a personalized estimate based on your circumstances.
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-2">
                  <AccordionTrigger>Do I have to pay back bursaries and grants?</AccordionTrigger>
                  <AccordionContent>
                    <div className="text-sm">
                      <p>
                        No, bursaries, scholarships, and grants typically do not need to be paid back. 
                        They are non-repayable forms of financial support.
                      </p>
                      <p className="mt-2">
                        However, student loans (both Tuition Fee Loans and Maintenance Loans) do need to be repaid, 
                        but only after you graduate and when you're earning above the repayment threshold.
                      </p>
                      <p className="mt-2 text-muted-foreground">
                        In some specific cases, if you withdraw from a course early, you might be asked to repay a 
                        portion of a bursary or scholarship. Always check the terms and conditions.
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-3">
                  <AccordionTrigger>Can international students get funding in the UK?</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-3 text-sm">
                      <p>
                        Yes, international students can access certain types of funding to study in the UK, although options are more limited than for UK students:
                      </p>
                      <ul className="list-disc pl-6 space-y-1">
                        <li><span className="font-medium">University Scholarships:</span> Many UK universities offer scholarships specifically for international students.</li>
                        <li><span className="font-medium">Chevening Scholarships:</span> The UK government's global scholarship program for outstanding students.</li>
                        <li><span className="font-medium">Commonwealth Scholarships:</span> For students from Commonwealth countries.</li>
                        <li><span className="font-medium">GREAT Scholarships:</span> In partnership with British Council for students from specific countries.</li>
                        <li><span className="font-medium">Country-Specific Scholarships:</span> Some countries provide funding for their citizens to study abroad.</li>
                      </ul>
                      <p className="text-muted-foreground mt-2">
                        International students generally cannot access Student Finance loans or means-tested bursaries unless they have settled status in the UK.
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-4">
                  <AccordionTrigger>How can I increase my chances of getting a scholarship?</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-3 text-sm">
                      <p>
                        To maximize your chances of securing a scholarship:
                      </p>
                      <ul className="list-disc pl-6 space-y-1">
                        <li><span className="font-medium">Start early:</span> Research and apply for scholarships well before deadlines.</li>
                        <li><span className="font-medium">Apply widely:</span> Don't limit yourself to one or two opportunities.</li>
                        <li><span className="font-medium">Tailor applications:</span> Customize each application to address specific scholarship criteria.</li>
                        <li><span className="font-medium">Strong personal statement:</span> Clearly articulate your achievements, goals, and why you deserve the scholarship.</li>
                        <li><span className="font-medium">Quality references:</span> Secure references from teachers/professors who know you well.</li>
                        <li><span className="font-medium">Prepare for interviews:</span> Practice for potential scholarship interviews.</li>
                        <li><span className="font-medium">Check eligibility carefully:</span> Only apply for scholarships where you meet all criteria.</li>
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-5">
                  <AccordionTrigger>What's the difference between scholarships, bursaries, and grants?</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-3 text-sm">
                      <p>
                        While these terms are sometimes used interchangeably, they typically have different meanings in UK education:
                      </p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>
                          <span className="font-medium">Scholarships:</span> Usually awarded based on academic merit, talent, or specific achievements. Often competitive and may require an application.
                        </li>
                        <li>
                          <span className="font-medium">Bursaries:</span> Typically based on financial need or personal circumstances (means-tested). Often automatically awarded if you meet certain criteria.
                        </li>
                        <li>
                          <span className="font-medium">Grants:</span> A broader term that can include various types of non-repayable funding, often provided by external organizations, charities, or government bodies.
                        </li>
                      </ul>
                      <p className="text-muted-foreground mt-2">
                        All three are forms of "gift aid" that don't need to be repaid, unlike loans which must be paid back.
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FundingInfoHub;
