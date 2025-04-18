import { useState } from 'react';
import { Search, Calendar, MapPin, Tag } from 'lucide-react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";  


function Home() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const cities = ['New York', 'Los Angeles', 'Chicago', 'Miami', 'San Francisco'];
  const categories = ['Weddings', 'Corporate Events', 'Conferences', 'Birthday Parties', 'Concerts'];

  return (
    <div className="flex flex-col">
      <section
        className="hero-section"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80")',
          height: '600px',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative'
        }}
      >
        <div className="overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">Welcome to Event Management</h1>
          <p className="hero-description">
            Create unforgettable moments with our professional event planning services.
            From intimate gatherings to grand celebrations, we make every event special.
          </p>
          <button className="btn btn-primary">Event Details</button>
        </div>
      </section>

      <section className="search-section">
        <div className="search-container">
          <div className="search-grid">
            <div className="form-group">
              <label>City</label>
              <div className="input-icon">
                <MapPin className="icon" />
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="form-select"
                >
                  <option value="">Select City</option>
                  {cities.map((city) => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Category</label>
              <div className="input-icon">
                <Tag className="icon" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="form-select"
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Date</label>
              <div className="input-icon">
                <Calendar className="icon" />
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  className="form-input"
                  placeholderText="Select Date"
                />
              </div>
            </div>

            <div className="form-group">
              <button className="btn btn-primary btn-search">
                <Search className="icon" />
                <span>Search Events</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="benefits-section">
        <h2 className="section-title">Why Choose Us</h2>
        <div className="benefits-grid">
          <div className="benefit-card">
            <div className="icon-container">
              <Calendar className="benefit-icon" />
            </div>
            <h3 className="benefit-title">Professional Planning</h3>
            <p className="benefit-description">
              Our experienced team ensures every detail is perfectly executed for your event is success.
            </p>
          </div>

          <div className="benefit-card">
            <div className="icon-container">
              <MapPin className="benefit-icon" />
            </div>
            <h3 className="benefit-title">Prime Locations</h3>
            <p className="benefit-description">
              Access to exclusive venues and locations that perfectly match your event is theme.
            </p>
          </div>

          <div className="benefit-card">
            <div className="icon-container">
              <Tag className="benefit-icon" />
            </div>
            <h3 className="benefit-title">Custom Solutions</h3>
            <p className="benefit-description">
              Tailored event packages that fit your specific needs and budget requirements.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
