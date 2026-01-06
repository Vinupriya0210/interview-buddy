import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { CandidateProfile } from '@/types/interview';
import { Mail, Phone, MapPin, Briefcase, GraduationCap, Award, Code } from 'lucide-react';

interface ResumeModalProps {
  candidate: CandidateProfile;
  open: boolean;
  onClose: () => void;
}

export const ResumeModal = ({ candidate, open, onClose }: ResumeModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle className="font-serif text-xl text-green-primary">Resume</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 p-2">
          {/* Header Section */}
          <div className="text-center border-b border-green-light pb-4">
            <h1 className="font-serif text-2xl font-bold text-green-primary">{candidate.name}</h1>
            <p className="text-green-dark font-medium mt-1">{candidate.roleApplied}</p>
            <div className="flex flex-wrap justify-center gap-4 mt-3 text-sm text-green-muted">
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5" />
                {candidate.email}
              </span>
              <span className="flex items-center gap-1">
                <Phone className="w-3.5 h-3.5" />
                {candidate.phone}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                Bangalore, India
              </span>
            </div>
          </div>

          {/* Objective */}
          <div>
            <h2 className="font-serif font-semibold text-lg text-green-primary flex items-center gap-2 mb-2">
              <Briefcase className="w-4 h-4" />
              Career Objective
            </h2>
            <p className="text-sm text-foreground leading-relaxed">
              Motivated and detail-oriented {candidate.experienceLevel === 'fresher' ? 'fresher' : 'professional'} seeking 
              a challenging position as {candidate.roleApplied} where I can utilize my skills and contribute to the 
              organization's growth while continuously learning and developing professionally.
            </p>
          </div>

          {/* Education */}
          <div>
            <h2 className="font-serif font-semibold text-lg text-green-primary flex items-center gap-2 mb-2">
              <GraduationCap className="w-4 h-4" />
              Education
            </h2>
            <div className="space-y-3">
              <div className="bg-bg-card rounded-lg p-3">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-sm">Bachelor of Technology in Computer Science</p>
                    <p className="text-sm text-green-muted">ABC Institute of Technology</p>
                  </div>
                  <span className="text-xs text-green-dark bg-green-light px-2 py-1 rounded">2020 - 2024</span>
                </div>
                <p className="text-xs text-green-muted mt-1">CGPA: 8.5/10</p>
              </div>
              <div className="bg-bg-card rounded-lg p-3">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-sm">Higher Secondary Education</p>
                    <p className="text-sm text-green-muted">XYZ Senior Secondary School</p>
                  </div>
                  <span className="text-xs text-green-dark bg-green-light px-2 py-1 rounded">2018 - 2020</span>
                </div>
                <p className="text-xs text-green-muted mt-1">Percentage: 92%</p>
              </div>
            </div>
          </div>

          {/* Internships */}
          <div>
            <h2 className="font-serif font-semibold text-lg text-green-primary flex items-center gap-2 mb-2">
              <Award className="w-4 h-4" />
              Internships
            </h2>
            <div className="space-y-3">
              <div className="bg-bg-card rounded-lg p-3">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-sm">Software Development Intern</p>
                    <p className="text-sm text-green-muted">Tech Solutions Pvt. Ltd.</p>
                  </div>
                  <span className="text-xs text-green-dark bg-green-light px-2 py-1 rounded">Jun 2023 - Aug 2023</span>
                </div>
                <ul className="text-xs text-foreground mt-2 space-y-1 list-disc list-inside">
                  <li>Developed and maintained web applications using React.js</li>
                  <li>Collaborated with senior developers on feature implementation</li>
                  <li>Participated in code reviews and agile sprints</li>
                </ul>
              </div>
              <div className="bg-bg-card rounded-lg p-3">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-sm">Web Development Intern</p>
                    <p className="text-sm text-green-muted">Digital Agency Inc.</p>
                  </div>
                  <span className="text-xs text-green-dark bg-green-light px-2 py-1 rounded">Jan 2023 - Mar 2023</span>
                </div>
                <ul className="text-xs text-foreground mt-2 space-y-1 list-disc list-inside">
                  <li>Built responsive landing pages for clients</li>
                  <li>Implemented UI/UX designs using HTML, CSS, and JavaScript</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Skills */}
          <div>
            <h2 className="font-serif font-semibold text-lg text-green-primary flex items-center gap-2 mb-2">
              <Code className="w-4 h-4" />
              Technical Skills
            </h2>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-bg-card rounded-lg p-3">
                <p className="font-medium text-xs text-green-dark mb-2">Programming Languages</p>
                <div className="flex flex-wrap gap-1.5">
                  {['JavaScript', 'TypeScript', 'Python', 'Java'].map((skill) => (
                    <span key={skill} className="text-xs bg-green-light text-green-primary px-2 py-0.5 rounded">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div className="bg-bg-card rounded-lg p-3">
                <p className="font-medium text-xs text-green-dark mb-2">Frameworks & Libraries</p>
                <div className="flex flex-wrap gap-1.5">
                  {['React.js', 'Node.js', 'Express', 'Tailwind CSS'].map((skill) => (
                    <span key={skill} className="text-xs bg-green-light text-green-primary px-2 py-0.5 rounded">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div className="bg-bg-card rounded-lg p-3">
                <p className="font-medium text-xs text-green-dark mb-2">Databases</p>
                <div className="flex flex-wrap gap-1.5">
                  {['MongoDB', 'MySQL', 'PostgreSQL'].map((skill) => (
                    <span key={skill} className="text-xs bg-green-light text-green-primary px-2 py-0.5 rounded">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div className="bg-bg-card rounded-lg p-3">
                <p className="font-medium text-xs text-green-dark mb-2">Tools & Platforms</p>
                <div className="flex flex-wrap gap-1.5">
                  {['Git', 'Docker', 'AWS', 'Figma'].map((skill) => (
                    <span key={skill} className="text-xs bg-green-light text-green-primary px-2 py-0.5 rounded">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
