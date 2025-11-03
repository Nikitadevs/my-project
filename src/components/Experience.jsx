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
			company: "Company Name",
			role: "Senior Software Engineer",
			period: "2020 - Present",
			description: "Led development of multiple high-impact projects...",
			achievements: [
				"Improved application performance by 40%",
				"Implemented new features used by 1M+ users",
				"Led a team of 5 developers"
			],
			technologies: ["React", "Node.js", "TypeScript", "AWS"]
		},
		// Add more experiences...
	];

	return (
		<section 
			id="experience" 
			className={`py-12 md:py-20 ${
				darkMode ? 'bg-gray-800/50 text-white' : 'bg-gray-100/50 text-gray-900'
			}`}
		>
			<div className="container mx-auto px-3 md:px-4">
				<div className="text-center mb-8 md:mb-16">
					<h2 className={`text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r bg-clip-text text-transparent
						${darkMode 
							? 'from-blue-400 via-purple-400 to-pink-400'
							: 'from-blue-600 via-purple-600 to-pink-600'}`}>
						Work Experience
					</h2>
					<div className={`h-1 w-20 mx-auto rounded-full mb-6 bg-gradient-to-r
						${darkMode
							? 'from-blue-400 via-purple-400 to-pink-400'
							: 'from-blue-600 via-purple-600 to-pink-600'}`} />
					<p className={`text-center text-lg md:text-xl mb-12 max-w-2xl mx-auto ${
						darkMode ? 'text-gray-400' : 'text-gray-600'
					}`}>
						Professional roles and career achievements
					</p>
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
								className={`relative grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 ${
									index % 2 === 0 ? 'md:text-right pl-8 md:pl-0' : 'md:text-left md:flex-row-reverse pl-8 md:pl-0'
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
									className={`md:w-[90%] ${index % 2 === 0 ? 'md:ml-auto' : ''}`}
								>
									<div className="p-4 md:p-6 relative">
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
										<p className={`mb-6 relative z-10 text-base leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{exp.description}</p>
										
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
									</div>
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
