function About() {
  const teamMembers = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Event Director',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      description: 'Over 10 years of experience in event planning and management.'
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Creative Director',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      description: 'Specializes in designing unique event experiences.'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      role: 'Operations Manager',
      image: 'https://img.freepik.com/free-photo/smiling-handsome-businessman-cafe-counter_1262-1984.jpg?ixlib=rb-1.2.1&auto=format&fit=crop&w=840&q=80',
      description: 'Expert in logistics and vendor management.'
    }
  ];

  return (
    <div className="about-page">
      <div className="section hero-section">
        <h1 className="page-title">About Us</h1>
        <p className="hero-descriptions">
          At EventMaster, we transform ordinary occasions into extraordinary experiences.
          With over a decade of expertise in event planning and management, we have built
          a reputation for creating memorable moments that exceed expectations.
        </p>
      </div>

      <div className="section mission-section">
        <div className="mission-grid">
          <div className="mission-card">
            <h2 className="section-title">Our Mission</h2>
            <p className="mission-text">
              To create exceptional events that bring people together and create lasting memories.
              We believe in the power of perfectly executed details and personalized experiences
              that reflect each client unique vision.
            </p>
          </div>
          <div className="mission-card">
            <h2 className="section-title">Our Vision</h2>
            <p className="mission-text">
              To be the leading event management company known for innovation, creativity,
              and unparalleled customer service. We strive to set new standards in the
              industry through our commitment to excellence.
            </p>
          </div>
        </div>
      </div>

      <div className="section team-section">
        <div className="text-center mb-12">
          <h2 className="section-title">Meet Our Team</h2>
          <p className="section-description">
            Our experienced professionals are passionate about creating perfect events.
          </p>
        </div>

        <div className="team-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {teamMembers.map((member) => (
            <div key={member.id} className="team-card bg-white shadow-md rounded-xl overflow-hidden">
              <img
                src={member.image}
                alt={member.name}
                className="team-image w-full h-64 object-cover"
              />
              <div className="team-info p-4">
                <h3 className="team-name text-xl font-semibold">{member.name}</h3>
                <p className="team-role text-gray-600">{member.role}</p>
                <p className="team-description text-gray-700">{member.description}</p>
              </div>
            </div>
          ))}
        </div>

      </div>

      <div className="cta-section">
        <h2 className="cta-title">Ready to Plan Your Event?</h2>
        <a href="/contact" className="btn btn-primary">Get in Touch</a>
      </div>
    </div>
  );
}

export default About;