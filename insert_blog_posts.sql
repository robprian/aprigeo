-- Insert sample blog posts with proper data
INSERT INTO blog_posts (
  title, slug, content, excerpt, featured_image, author_id, status, published_at, created_at, updated_at
) VALUES 
(
  'GPS Technology Revolution in Modern Surveying',
  'gps-technology-revolution-modern-surveying',
  '<p>GPS technology has fundamentally transformed the surveying industry, bringing unprecedented accuracy and efficiency to field operations. From basic navigation to centimeter-level precision mapping, modern GNSS systems have become the backbone of professional surveying.</p>
   <h3>Key Advancements</h3>
   <ul>
     <li>Real-Time Kinematic (RTK) positioning</li>
     <li>Multi-constellation GNSS support</li>
     <li>Tilt compensation technology</li>
     <li>Cloud-based correction services</li>
   </ul>
   <p>These innovations have reduced project timelines while increasing accuracy, making GPS an indispensable tool for surveyors worldwide.</p>',
  'Discover how GPS technology has revolutionized modern surveying practices with cutting-edge innovations in accuracy and efficiency.',
  'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=800',
  1,
  'published',
  NOW() - INTERVAL '2 days',
  NOW() - INTERVAL '2 days',
  NOW() - INTERVAL '2 days'
),
(
  'Total Station vs GNSS: Choosing the Right Tool',
  'total-station-vs-gnss-choosing-right-tool',
  '<p>Understanding when to use a total station versus GNSS equipment is crucial for successful surveying projects. Each technology has distinct advantages depending on the environment and requirements.</p>
   <h3>Total Station Benefits</h3>
   <ul>
     <li>No satellite dependency</li>
     <li>Works in any weather</li>
     <li>High precision measurements</li>
     <li>Direct angular measurements</li>
   </ul>
   <h3>GNSS Advantages</h3>
   <ul>
     <li>Faster data collection</li>
     <li>Real-time positioning</li>
     <li>Large area coverage</li>
     <li>Network RTK capabilities</li>
   </ul>',
  'A comprehensive guide to choosing between total stations and GNSS systems for different surveying applications.',
  'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800',
  1,
  'published',
  NOW() - INTERVAL '5 days',
  NOW() - INTERVAL '5 days',
  NOW() - INTERVAL '5 days'
),
(
  'Best Practices for RTK Survey Setup',
  'best-practices-rtk-survey-setup',
  '<p>Setting up an RTK survey requires careful planning and execution to achieve optimal results. Proper base station positioning, radio communication setup, and rover configuration are essential for success.</p>
   <h3>Base Station Setup</h3>
   <p>Choose a location with clear sky view and minimal obstructions. The base station should be positioned on a stable, well-marked point with known coordinates when possible.</p>
   <h3>Communication Range</h3>
   <p>Ensure reliable radio communication between base and rover. Use repeaters if necessary to extend range in challenging terrain.</p>
   <h3>Quality Checks</h3>
   <p>Always perform regular quality checks including coordinate comparisons and precision monitoring throughout the survey.</p>',
  'Essential tips and best practices for setting up successful RTK surveys in various field conditions.',
  'https://images.unsplash.com/photo-1609205801107-4a2dc63b7777?w=800',
  1,
  'published',
  NOW() - INTERVAL '1 week',
  NOW() - INTERVAL '1 week',
  NOW() - INTERVAL '1 week'
),
(
  'The Future of Survey Technology: AI and Automation',
  'future-survey-technology-ai-automation',
  '<p>Artificial intelligence and automation are beginning to reshape the surveying industry. From automated data processing to intelligent equipment that can self-calibrate and optimize performance, the future promises even greater efficiency and accuracy.</p>
   <h3>AI Applications</h3>
   <ul>
     <li>Automated data validation</li>
     <li>Intelligent point cloud processing</li>
     <li>Predictive maintenance</li>
     <li>Error detection and correction</li>
   </ul>
   <h3>Automation Benefits</h3>
   <p>Reduced human error, faster data processing, and improved consistency are just some of the benefits that automation brings to modern surveying workflows.</p>',
  'Exploring how artificial intelligence and automation technologies are transforming the surveying profession.',
  'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=800',
  1,
  'published',
  NOW() - INTERVAL '3 days',
  NOW() - INTERVAL '3 days',
  NOW() - INTERVAL '3 days'
),
(
  'Maintenance Tips for Survey Equipment',
  'maintenance-tips-survey-equipment',
  '<p>Proper maintenance of survey equipment is essential for accurate measurements and long equipment life. Regular cleaning, calibration, and storage practices can prevent costly repairs and ensure reliable performance in the field.</p>
   <h3>Daily Care</h3>
   <ul>
     <li>Clean lenses and sensors</li>
     <li>Check battery levels</li>
     <li>Protect from moisture</li>
     <li>Secure during transport</li>
   </ul>
   <h3>Calibration Schedule</h3>
   <p>Follow manufacturer recommendations for calibration intervals. Most precision instruments require annual calibration for warranty compliance and optimal accuracy.</p>',
  'Comprehensive maintenance guide to keep your survey equipment performing at peak accuracy and reliability.',
  'https://images.unsplash.com/photo-1581094289206-c0ddd9e21b0e?w=800',
  1,
  'published',
  NOW() - INTERVAL '4 days',
  NOW() - INTERVAL '4 days',
  NOW() - INTERVAL '4 days'
);
