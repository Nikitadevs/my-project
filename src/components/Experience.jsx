import React from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import Card3D from './Card3D';

const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.2
		}
	}
};

const itemVariants = {
	hidden: { opacity: 0, y: 20 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.5,
			ease: "easeOut"
		}
	}
};

const Experience = ({ darkMode }) => {
	const experiences = [
		{
			company: "TechCorp Inc.",
			role: "Senior Software Engineer",
			period: "2020 - Present",
			description: "Led development of multiple high-impact projects, architecting scalable solutions that serve millions of users globally. Spearheaded the migration to microservices architecture.",
			achievements: [
				"Improved application performance by 40% through code optimization",
				"Implemented new features used by 1M+ active users",
				"Led a team of 5 developers and mentored junior engineers",
				"Reduced deployment time by 60% with CI/CD automation"
			],
			technologies: ["React", "Node.js", "TypeScript", "AWS", "Docker"]
		},
		{
			company: "StartupHub Solutions",
			role: "Full Stack Developer",
			period: "2018 - 2020",
			description: "Developed and maintained full-stack web applications, collaborating with cross-functional teams to deliver high-quality software solutions.",
			achievements: [
				"Built responsive web applications from scratch",
				"Integrated third-party APIs and payment systems",
				"Optimized database queries improving load times by 50%"
			],
			technologies: ["JavaScript", "Python", "MongoDB", "Express"]
		},
		{
			company: "Digital Agency Pro",
			role: "Frontend Developer",
			period: "2016 - 2018",
			description: "Created beautiful and functional user interfaces for client projects, ensuring pixel-perfect implementation and cross-browser compatibility.",
			achievements: [
				"Delivered 20+ client projects on time and within budget",
				"Improved website load times by 35% through optimization",
				"Implemented accessibility standards (WCAG 2.1)"
			],
			technologies: ["HTML5", "CSS3", "JavaScript", "jQuery", "Bootstrap"]
		}
	];

	return (
		<section
			id="experience"
			className={`relative py-16 md:py-24 overflow-hidden ${darkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-b from-gray-50 to-white text-gray-900'
				}`}
		>
			{/* Animated background elements */}
			<div className="absolute inset-0 overflow-hidden pointer-events-none">
				<motion.div
					className={`absolute top-20 -right-20 w-96 h-96 rounded-full blur-3xl ${darkMode ? 'bg-blue-500/10' : 'bg-blue-200/30'
						}`}
					animate={{
						scale: [1, 1.2, 1],
						x: [0, 50, 0],
						y: [0, -30, 0],
					}}
					transition={{
						duration: 20,
						repeat: Infinity,
						ease: "easeInOut"
					}}
				/>
				<motion.div
					className={`absolute bottom-40 -left-20 w-96 h-96 rounded-full blur-3xl ${darkMode ? 'bg-purple-500/10' : 'bg-purple-200/30'
						}`}
					animate={{
						scale: [1, 1.3, 1],
						x: [0, -50, 0],
						y: [0, 30, 0],
					}}
					transition={{
						duration: 25,
						repeat: Infinity,
						ease: "easeInOut"
					}}
				/>
			</div>
			<div className="container mx-auto px-4 md:px-6 relative z-10">
<div className="text-center mb-12 md:mb-20">
				<motion.div
					className="inline-block mb-4"
					initial={{ opacity: 0, y: -20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
				>
					<span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm ${darkMode ? 'bg-blue-500/20 text-blue-300 border border-blue-400/30' : 'bg-blue-100 text-blue-700 border border-blue-200'}`}>
						Work Experience
					</span>
				</motion.div>
				<motion.h2
					className={`text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r bg-clip-text text-transparent ${darkMode ? 'from-blue-400 via-purple-400 to-pink-400' : 'from-blue-600 via-purple-600 to-pink-600'}`}
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6, delay: 0.1 }}
				>
					Work Experience
				</motion.h2>
				<motion.div
					className={`h-1.5 w-24 mx-auto rounded-full mb-6 bg-gradient-to-r shadow-lg ${darkMode ? 'from-blue-400 via-purple-400 to-pink-400 shadow-blue-500/50' : 'from-blue-600 via-purple-600 to-pink-600 shadow-purple-500/50'}`}
					initial={{ width: 0 }}
					whileInView={{ width: 96 }}
					viewport={{ once: true }}
					transition={{ duration: 0.8, delay: 0.2 }}
				/>
				<motion.p
					className={`text-center text-lg md:text-xl mb-12 max-w-2xl mx-auto ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6, delay: 0.3 }}
				>
					Professional roles and career achievements
				</motion.p>
				</div>

				<motion.div
					className="relative max-w-6xl mx-auto"
					variants={containerVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, amount: 0.3 }}
				>
					{/* Timeline line */}
					<div
						className={`absolute left-[12px] md:left-1/2 h-full w-1 md:w-0.5 transform md:-translate-x-1/2
							${darkMode ? 'bg-gray-800' : 'bg-gray-200'}`}
					>
						<motion.div
							className={`absolute top-0 w-full ${darkMode ? 'bg-blue-500' : 'bg-blue-600'} rounded-full`}
							style={{ height: '0%' }}
							animate={{ height: '100%' }}
							transition={{ duration: 1.5, ease: "easeInOut" }}
						/>
					</div>

					{/* Experience cards */}
					<div className="space-y-8 md:space-y-12">
						{experiences.map((exp, index) => (
							<motion.div
								key={index}
								variants={itemVariants}
								className={`relative grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 ${index % 2 === 0 ? 'md:text-right pl-8 md:pl-0' : 'md:text-left md:flex-row-reverse pl-8 md:pl-0'
									}`}
							>
								{/* Timeline dot with liquid effect */}
								<motion.div
									className={`absolute left-[10px] md:left-1/2 w-3 h-3 md:w-4 md:h-4 rounded-full transform md:-translate-x-1/2 z-10 relative
										${darkMode ? 'bg-blue-500' : 'bg-blue-600'}`}
									whileHover={{ scale: 2 }}
									transition={{ duration: 0.3 }}
								>
									{/* Pulsing ring */}
									<motion.div
										className={`absolute inset-0 rounded-full ${darkMode ? 'bg-blue-400' : 'bg-blue-500'}`}
										animate={{
											scale: [1, 2, 1],
											opacity: [0.6, 0, 0.6],
										}}
										transition={{
											duration: 2,
											repeat: Infinity,
											ease: "easeInOut"
										}}
									/>
								</motion.div>

								<Card3D
									darkMode={darkMode}
									className={`md:w-[90%] ${index % 2 === 0 ? 'md:ml-auto' : ''} backdrop-blur-xl shadow-xl hover:shadow-2xl transition-shadow duration-300`}
								>
									<motion.div
										className={`p-4 md:p-6 relative rounded-2xl backdrop-blur-xl overflow-hidden ${darkMode
											? 'bg-gradient-to-br from-gray-800/90 to-gray-900/90 border border-white/10'
											: 'bg-white/90 border border-gray-200/50 shadow-xl'
											}`}
										whileHover={{ scale: 1.02, borderColor: darkMode ? 'rgba(59, 130, 246, 0.3)' : 'rgba(59, 130, 246, 0.5)' }}
										transition={{ duration: 0.3 }}
									>
										{/* Floating gradient orb */}
										<motion.div
											className={`absolute w-32 h-32 rounded-full blur-3xl opacity-10 bg-gradient-to-r from-blue-400 to-purple-400`}
											animate={{
												x: [0, 20, 0],
												y: [0, -20, 0],
												scale: [1, 1.2, 1],
											}}
											transition={{
												duration: 4,
												repeat: Infinity,
												ease: "easeInOut"
											}}
											style={{ top: '-10%', right: '-10%' }}
										/>

										<h3 className="text-xl md:text-2xl font-bold mb-3 relative z-10 leading-tight">{exp.role}</h3>
										<p className={`text-lg md:text-xl mb-2 relative z-10 font-semibold ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
											{exp.company}
										</p>
										<motion.p
											className={`text-sm mb-4 relative z-10 inline-block px-3 py-1 rounded-full backdrop-blur-sm ${darkMode ? 'bg-gray-700/50 text-gray-300' : 'bg-gray-200/50 text-gray-600'}`}
											whileHover={{ scale: 1.05 }}
										>
											{exp.period}
										</motion.p>
										<p className={`mb-4 md:mb-6 relative z-10 text-sm md:text-base leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{exp.description}</p>

										<div className="space-y-2">
											{exp.achievements.map((achievement, i) => (
												<motion.div
													key={i}
													initial={{ opacity: 0, x: -20 }}
													whileInView={{ opacity: 1, x: 0 }}
													transition={{ delay: i * 0.1 }}
													className="flex items-center gap-2"
												>
													<motion.svg
														xmlns="http://www.w3.org/2000/svg"
														className={`h-5 w-5 flex-shrink-0 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}
														viewBox="0 0 20 20"
														fill="currentColor"
														whileHover={{ scale: 1.2, rotate: 360 }}
														transition={{ duration: 0.3 }}
													>
														<path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
													</motion.svg>
													<span>{achievement}</span>
												</motion.div>
											))}
										</div>

										<div className="mt-4 flex flex-wrap gap-1.5 md:gap-2">
											{exp.technologies.map((tech, i) => (
												<motion.span
													key={i}
													className={`px-2 md:px-3 py-1 rounded-full text-xs md:text-sm
														${darkMode
															? 'bg-gray-800 text-gray-300'
															: 'bg-gray-100 text-gray-700'
														}`}
													whileHover={{
														scale: 1.1,
														backgroundColor: darkMode ? '#3B82F6' : '#2563EB',
														color: '#ffffff'
													}}
													transition={{ duration: 0.2 }}
												>
													{tech}
												</motion.span>
											))}
										</div>
									</motion.div>
								</Card3D>
							</motion.div>
						))}
					</div>
				</motion.div>
			</div>
		</section>
	);
};

Experience.propTypes = {
	darkMode: PropTypes.bool.isRequired,
};

export default React.memo(Experience);
