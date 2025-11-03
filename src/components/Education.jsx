import React from "react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faGraduationCap,
	faCalendarAlt,
	faMapMarkerAlt,
	faCertificate,
	faTrophy,
} from "@fortawesome/free-solid-svg-icons";
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

const Education = ({ darkMode }) => {
	const education = [
		{
			school: "University Name",
			degree: "Master of Science in Computer Science",
			period: "2018 - 2020",
			description: "Specialized in Artificial Intelligence and Machine Learning",
			achievements: [
				"Graduated with Honors",
				"Published 2 research papers",
				"Led student AI research group"
			],
			courses: ["Advanced Algorithms", "Machine Learning", "Neural Networks"]
		},
	];

	return (
		<section 
			id="education" 
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
						Education & Certifications
					</h2>
					<div className={`h-1 w-20 mx-auto rounded-full mb-6 bg-gradient-to-r
						${darkMode
							? 'from-blue-400 via-purple-400 to-pink-400'
							: 'from-blue-600 via-purple-600 to-pink-600'}`} />
					<p className={`text-center text-lg md:text-xl mb-12 max-w-2xl mx-auto ${
						darkMode ? 'text-gray-400' : 'text-gray-600'
					}`}>
						My academic background and learning journey
					</p>
				</div>

				<motion.div
					className="max-w-6xl mx-auto"
					variants={containerVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, amount: 0.3 }}
				>

					<div className="relative">
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

						{/* Education cards */}
						<div className="space-y-8 md:space-y-12">
							{education.map((edu, index) => (
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
										<div className="p-4 md:p-6">
											<motion.div
												className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center mb-4 relative backdrop-blur-xl shadow-lg
													${darkMode ? 'bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/10' : 'bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-200/50'}`}
												whileHover={{ 
													scale: 1.05, 
													y: -2,
													boxShadow: darkMode 
														? '0 12px 24px rgba(59, 130, 246, 0.3)'
														: '0 12px 24px rgba(59, 130, 246, 0.2)'
												}}
												transition={{ duration: 0.3, ease: [0.43, 0.13, 0.23, 0.96] }}
											>
												{/* Subtle glow */}
												<motion.div
													className={`absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400 to-purple-400 blur-xl opacity-0`}
													whileHover={{ opacity: 0.4 }}
													transition={{ duration: 0.3 }}
												/>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													className={`h-6 w-6 md:h-7 md:w-7 relative z-10 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}
													fill="none"
													viewBox="0 0 24 24"
													stroke="currentColor"
													strokeWidth={2}
												>
													<path d="M12 14l9-5-9-5-9 5 9 5z" />
													<path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
													<path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
												</svg>
											</motion.div>

											<h3 className="text-xl md:text-2xl font-bold mb-3 leading-tight">{edu.degree}</h3>
											<p className={`text-lg md:text-xl mb-2 font-semibold ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
												{edu.school}
											</p>
											<motion.p 
												className={`text-sm mb-4 inline-block px-3 py-1 rounded-full backdrop-blur-sm ${darkMode ? 'bg-gray-700/50 text-gray-300' : 'bg-gray-200/50 text-gray-600'}`}
												whileHover={{ scale: 1.05 }}
											>
												{edu.period}
											</motion.p>
											<p className={`mb-6 text-base leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{edu.description}</p>

											<div className="space-y-2 mb-4">
												{edu.achievements.map((achievement, i) => (
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
															whileHover={{ scale: 1.1 }}
															transition={{ duration: 0.2 }}
														>
															<path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
														</motion.svg>
														<span>{achievement}</span>
													</motion.div>
												))}
											</div>

											<div className="flex flex-wrap gap-1.5 md:gap-2">
												{edu.courses.map((course, i) => (
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
														{course}
													</motion.span>
												))}
											</div>
										</div>
									</Card3D>
								</motion.div>
							))}
						</div>
					</div>
				</motion.div>
			</div>
		</section>
	);
};

Education.propTypes = {
	darkMode: PropTypes.bool.isRequired,
};

export default React.memo(Education);
