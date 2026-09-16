import {ShieldCheck,LockKeyhole} from 'lucide-react';
export default function ContributorAccess(){return <>
  <div className="modal-icon"><LockKeyhole/></div><div className="eyebrow">ICARUS / RESTRICTED CONTRIBUTOR ACCESS</div>
  <h2>Open to read.<br/>Reviewed to contribute.</h2>
  <p>Reading and downloading data is free. Publishing measurements requires approval from Porto Space Team.</p>
  <ol className="access-steps"><li><strong>Researcher evaluation</strong><p>The team reviews your institutional identity, role, instrument documentation and data provenance.</p></li><li><strong>Secure account activation</strong><p>Approved contributors will need an invitation and two-factor authentication before accessing the upload workspace.</p></li><li><strong>Independent dataset review</strong><p>Each submission must pass quality and provenance review before it appears in the public archive.</p></li></ol>
  <div className="access-locked"><ShieldCheck size={20}/><span><strong>Submissions are closed</strong><br/>Contributor accounts and the review service are not connected yet. No files can be uploaded or published through this website.</span></div>
  <p className="small-note">For the future evaluation, prepare an institutional profile, instrument calibration details, collection methods and the dataset’s usage permissions. Do not include private documents in public GitHub issues.</p>
  <a className="button subdued" href="https://github.com/PortoSpaceTeamNI" target="_blank" rel="noreferrer">Porto Space Team <ShieldCheck size={16}/></a>
</>}
