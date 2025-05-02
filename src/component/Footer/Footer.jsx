const Footer = () => {
  return (
    <footer>
      <div style={{ width: '100%', maxWidth: '1208px', paddingTop: '4rem' }}>
        <div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '32px',
              paddingBottom: '4rem',
            }}
          >
            <div
              style={{
                width: '100%',
                maxWidth: '400px',
                display: 'flex',
                flexDirection: 'column',
                // gap: "20px",
              }}
            >
              <h3
                style={{
                  fontSize: '2.5rem',
                  color: '#0B3558',
                  fontWeight: '600',
                  lineHeight: '5rem',
                }}
              >
                Easy <span style={{ color: '#006BFF' }}>ahead</span>
              </h3>
              <p
                style={{
                  color: 'rgb(93, 109, 123)',
                  fontWeight: '300',
                  fontSize: '1rem',
                }}
              >
                We take the work out of connecting with others so you can accomplish more.
              </p>
            </div>
            <div className="footer_left">
              <button
                style={{
                  color: '#056EFF',
                  padding: '0.6rem',
                  backgroundColor: '#E6F0FF',
                  borderRadius: '6666px',
                  textTransform: 'uppercase',
                }}
              >
                Featured
              </button>

              <h4
                style={{
                  fontSize: '1.4rem',
                  color: '#0B3558',
                  fontWeight: '500',
                }}
              >
                2024 Report: The State of Meetings
              </h4>
              <p
                style={{
                  color: 'rgb(93, 109, 123)',
                  fontWeight: '300',
                  fontSize: '1rem',
                }}
              >
                See the latest data on meeting culture and productivity
              </p>
            </div>
          </div>
          <div className="footer_middle">
            <div>
              <h5>Features</h5>
              <ul>
                <li>Scheduling automation</li>
                <li>Customizable availability</li>
                <li>Mobile apps</li>
                <li>Browser extensions</li>
                <li>Meeting routing</li>
                <li>Event Types</li>
                <li>Email & website embeds</li>
                <li>Reminders & follow-ups</li>
                <li>Meeting polls</li>
                <li>Analytics</li>
                <li>Admin management</li>
              </ul>
            </div>
            <div>
              <h5>Integrations</h5>
              <ul>
                <li>Google ecosystem</li>
                <li>Microsoft ecosystem</li>
                <li>Calendars</li>
                <li>Video conferencing</li>
                <li>Payments</li>
                <li>Sales & CRM</li>
                <li>Recruiting & ATS</li>
                <li>Email messaging</li>
                <li>Embed Calendly</li>
                <li>Analytics</li>
                <li>API & connectors</li>
                <li>Security & compliance</li>
              </ul>
            </div>
            <div>
              <h5>Calendlly</h5>
              <ul>
                <li>Pricing</li>
                <li>Product overview</li>
                <li>Solutions</li>
                <li>For individuals</li>
                <li>For small businesses</li>
                <li>For enterprise</li>
                <li>Compare</li>
                <li>Security</li>
                <li> Sign up for free</li>
                <li>Talk to sales</li>
                <li>Get a demo</li>
              </ul>
            </div>
            <div>
              <h5>Resources</h5>
              <ul>
                <li>Help center</li>
                <li>Resource center</li>
                <li>Blog</li>
                <li>Customer stories</li>
                <li>Calendly community</li>
                <li>Developer tools</li>
              </ul>
            </div>
            <div>
              <h5>Company</h5>
              <ul>
                <li>About us</li>
                <li>Leadership</li>
                <li>Careers</li>
                <li>Newsroom </li>
                <li>Become a partner</li>
                <li>Contact us</li>
              </ul>
            </div>
          </div>
          <div className="footer_bottom">
            <h4>English</h4>
            <ul>
              <li>Privacy Policy</li>
              <li>Legal</li>
              <li>Status</li>
              <li>Cookie settings</li>
              <li>Your Privacy Choices</li>
            </ul>
            <h3>Copyright calendlly 2025</h3>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
