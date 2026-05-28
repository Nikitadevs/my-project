import React from "react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import Card3D from './Card3D';

const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.15,
			delayChildren: 0.1
		}
	}
};

const itemVariants = {
	hidden: { opacity: 0, y: 30, scale: 0.95 },
	visible: {
		opacity: 1,
		y: 0,
		scale: 1,
		transition: {
			duration: 0.6,
			ease: [0.43, 0.13, 0.23, 0.96]
		}
	}
};

const achievementVariants = {
	hidden: { opacity: 0, x: -30 },
	visible: (i) => ({
		opacity: 1,
		x: 0,
		transition: {
			delay: i * 0.1,
			duration: 0.5,
			ease: "easeOut"
		}
	})
};

const Education = ({ darkMode }) => {
	const education = [
		{
			school: "Mundelein High School",
			degree: "High School Diploma",
			period: "2023 - 2027",
			description: "Specialized in Artificial Intelligence and Machine Learning with focus on deep learning architectures and natural language processing",
			achievements: [
				"Graduated with High Honors (GPA: 3.9/4.0)",
				"Published 3 research papers in top-tier AI conferences",
				"Led student AI research group with 15+ members",
				"Received Best Thesis Award for ML research"
			],
			courses: ["Advanced Algorithms", "Machine Learning", "Neural Networks", "Computer Vision", "NLP", "Deep Learning"]
		}
	];

	return (
		<section
			id="education"
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
				{/* Header Section */}
				<motion.div
					className="text-center mb-12 md:mb-20"
					initial={{ opacity: 0, y: -20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
				>
					<motion.div
						className="inline-block mb-4"
						whileHover={{ scale: 1.05 }}
						transition={{ duration: 0.3 }}
					>
						<span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm ${darkMode
							? 'bg-blue-500/20 text-blue-300 border border-blue-400/30'
							: 'bg-blue-100 text-blue-700 border border-blue-200'
							}`}>
							<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
								<path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
							</svg>
							Education Journey
						</span>
					</motion.div>

					<h2 className={`text-5xl md:text-7xl font-extrabold mb-6 leading-tight`}>
						<motion.span
							className={`bg-gradient-to-r bg-clip-text text-transparent ${darkMode
								? 'from-blue-400 via-purple-400 to-pink-400'
								: 'from-blue-600 via-purple-600 to-pink-600'
								}`}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.6, delay: 0.2 }}
						>
							Education &
						</motion.span>
						<br />
						<motion.span
							className={`bg-gradient-to-r bg-clip-text text-transparent ${darkMode
								? 'from-pink-400 via-purple-400 to-blue-400'
								: 'from-pink-600 via-purple-600 to-blue-600'
								}`}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.6, delay: 0.3 }}
						>
							Certifications
						</motion.span>
					</h2>

					<motion.div
						className={`h-1.5 w-24 mx-auto rounded-full mb-8 bg-gradient-to-r shadow-lg ${darkMode
							? 'from-blue-400 via-purple-400 to-pink-400 shadow-blue-500/50'
							: 'from-blue-600 via-purple-600 to-pink-600 shadow-purple-500/50'
							}`}
						initial={{ width: 0 }}
						whileInView={{ width: 96 }}
						viewport={{ once: true }}
						transition={{ duration: 0.8, delay: 0.4 }}
					/>

					<motion.p
						className={`text-lg md:text-xl max-w-3xl mx-auto leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-600'
							}`}
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6, delay: 0.5 }}
					>
						Building expertise through continuous learning and academic excellence
					</motion.p>
				</motion.div>

				<motion.div
					className="max-w-6xl mx-auto"
					variants={containerVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, amount: 0.2 }}
				>
					<div className="relative">
						{/* Enhanced Timeline line */}
						<div
							className={`absolute left-[16px] md:left-1/2 h-full w-1 transform md:-translate-x-1/2 rounded-full overflow-hidden ${darkMode ? 'bg-gray-800/50' : 'bg-gray-200/80'
								}`}
						>
							<motion.div
								className={`absolute top-0 w-full rounded-full shadow-lg ${darkMode
									? 'bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500'
									: 'bg-gradient-to-b from-blue-600 via-purple-600 to-pink-600'
									}`}
								style={{ height: '0%' }}
								animate={{ height: '100%' }}
								transition={{ duration: 2, ease: "easeInOut", delay: 0.3 }}
							/>
						</div>

						{/* Education cards */}
						<div className="space-y-12 md:space-y-16">
							{education.map((edu, index) => (
								<motion.div
									key={index}
									variants={itemVariants}
									className={`relative grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 ${index % 2 === 0 ? 'md:text-right pl-12 md:pl-0' : 'md:text-left md:flex-row-reverse pl-12 md:pl-0'
										}`}
								>
									{/* Enhanced Timeline dot */}
									<motion.div
										className={`absolute left-[9px] md:left-1/2 w-4 h-4 md:w-5 md:h-5 rounded-full transform md:-translate-x-1/2 z-20 shadow-xl ${darkMode ? 'bg-gradient-to-br from-blue-400 to-purple-500' : 'bg-gradient-to-br from-blue-500 to-purple-600'
											}`}
										whileHover={{ scale: 1.8 }}
										transition={{ duration: 0.3 }}
									>
										{/* Multiple pulsing rings */}
										<motion.div
											className={`absolute inset-0 rounded-full ${darkMode ? 'bg-blue-400' : 'bg-blue-500'}`}
											animate={{
												scale: [1, 2.5, 1],
												opacity: [0.8, 0, 0.8],
											}}
											transition={{
												duration: 2.5,
												repeat: Infinity,
												ease: "easeInOut"
											}}
										/>
										<motion.div
											className={`absolute inset-0 rounded-full ${darkMode ? 'bg-purple-400' : 'bg-purple-500'}`}
											animate={{
												scale: [1, 2, 1],
												opacity: [0.6, 0, 0.6],
											}}
											transition={{
												duration: 2,
												repeat: Infinity,
												ease: "easeInOut",
												delay: 0.5
											}}
										/>
									</motion.div>

									<Card3D
										darkMode={darkMode}
										className={`md:w-[92%] ${index % 2 === 0 ? 'md:ml-auto' : ''} group`}
									>
										<motion.div
											className={`p-6 md:p-8 relative overflow-hidden rounded-2xl ${darkMode
												? 'bg-gradient-to-br from-gray-800/90 to-gray-900/90'
												: 'bg-gradient-to-br from-white to-gray-50/50'
												}`}
											whileHover={{ scale: 1.01 }}
											transition={{ duration: 0.3 }}
										>
											{/* Hover gradient background */}
											<motion.div
												className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${darkMode
													? 'bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5'
													: 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50'
													}`}
											/>

											<div className="relative z-10">
												{/* Enhanced Icon */}
												<motion.div
													className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center mb-5 relative backdrop-blur-xl shadow-2xl overflow-hidden ${darkMode
														? 'bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 border border-white/10'
														: 'bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 border border-blue-200/50'
														}`}
													whileHover={{
														scale: 1.1,
														rotate: 5,
														boxShadow: darkMode
															? '0 20px 40px rgba(59, 130, 246, 0.4)'
															: '0 20px 40px rgba(59, 130, 246, 0.3)'
													}}
													transition={{ duration: 0.4, ease: [0.43, 0.13, 0.23, 0.96] }}
												>
													{/* Animated glow */}
													<motion.div
														className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 blur-2xl opacity-0"
														whileHover={{ opacity: 0.6 }}
														transition={{ duration: 0.4 }}
													/>

													{/* Rotating background gradient */}
													<motion.div
														className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 ${darkMode
															? 'bg-gradient-to-br from-blue-500/30 to-purple-500/30'
															: 'bg-gradient-to-br from-blue-200/50 to-purple-200/50'
															}`}
														transition={{ duration: 0.4 }}
													/>

													<svg
														xmlns="http://www.w3.org/2000/svg"
														className={`h-7 w-7 md:h-8 md:w-8 relative z-10 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}
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

												{/* Content */}
												<motion.h3
													className="text-2xl md:text-3xl font-extrabold mb-3 leading-tight"
													initial={{ opacity: 0, y: 10 }}
													whileInView={{ opacity: 1, y: 0 }}
													viewport={{ once: true }}
													transition={{ delay: 0.2 }}
												>
													{edu.degree}
												</motion.h3>

												<motion.p
													className={`text-lg md:text-xl mb-3 font-bold bg-gradient-to-r bg-clip-text text-transparent ${darkMode
														? 'from-blue-400 to-purple-400'
														: 'from-blue-600 to-purple-600'
														}`}
													initial={{ opacity: 0, y: 10 }}
													whileInView={{ opacity: 1, y: 0 }}
													viewport={{ once: true }}
													transition={{ delay: 0.3 }}
												>
													{edu.school}
												</motion.p>

												<motion.div
													className="mb-5"
													initial={{ opacity: 0, y: 10 }}
													whileInView={{ opacity: 1, y: 0 }}
													viewport={{ once: true }}
													transition={{ delay: 0.4 }}
												>
													<motion.span
														className={`inline-flex items-center gap-2 text-sm font-medium px-4 py-1.5 rounded-full backdrop-blur-md border shadow-lg ${darkMode
															? 'bg-gray-700/50 text-gray-200 border-gray-600/50'
															: 'bg-white/80 text-gray-700 border-gray-200'
															}`}
														whileHover={{ scale: 1.05, y: -2 }}
														transition={{ duration: 0.2 }}
													>
														<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
															<path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
														</svg>
														{edu.period}
													</motion.span>
												</motion.div>

												<motion.p
													className={`mb-6 text-base md:text-lg leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-600'
														}`}
													initial={{ opacity: 0 }}
													whileInView={{ opacity: 1 }}
													viewport={{ once: true }}
													transition={{ delay: 0.5 }}
												>
													{edu.description}
												</motion.p>

												{/* Achievements with enhanced animation */}
												<div className="space-y-3 mb-6">
													<h4 className={`text-sm font-bold uppercase tracking-wider mb-3 ${darkMode ? 'text-gray-400' : 'text-gray-500'
														}`}>
														Key Achievements
													</h4>
													{edu.achievements.map((achievement, i) => (
														<motion.div
															key={i}
															custom={i}
															variants={achievementVariants}
															initial="hidden"
															whileInView="visible"
															viewport={{ once: true }}
															className="flex items-start gap-3 group/item"
															whileHover={{ x: 5 }}
															transition={{ duration: 0.2 }}
														>
															<motion.div
																className={`mt-0.5 flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${darkMode
																	? 'bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-400/30'
																	: 'bg-gradient-to-br from-blue-100 to-purple-100 border border-blue-300/50'
																	}`}
																whileHover={{
																	scale: 1.2,
																	rotate: 360,
																	boxShadow: darkMode
																		? '0 0 20px rgba(59, 130, 246, 0.5)'
																		: '0 0 20px rgba(59, 130, 246, 0.3)'
																}}
																transition={{ duration: 0.5 }}
															>
																<svg
																	className={`h-4 w-4 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}
																	viewBox="0 0 20 20"
																	fill="currentColor"
																>
																	<path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
																</svg>
															</motion.div>
															<span className={`text-base leading-relaxed ${darkMode ? 'text-gray-200' : 'text-gray-700'
																}`}>
																{achievement}
															</span>
														</motion.div>
													))}
												</div>

												{/* Enhanced course tags */}
												<div>
													<h4 className={`text-sm font-bold uppercase tracking-wider mb-3 ${darkMode ? 'text-gray-400' : 'text-gray-500'
														}`}>
														Key Courses
													</h4>
													<div className="flex flex-wrap gap-2">
														{edu.courses.map((course, i) => (
															<motion.span
																key={i}
																className={`px-4 py-2 rounded-lg text-sm font-medium backdrop-blur-sm border transition-all duration-300 cursor-pointer ${darkMode
																	? 'bg-gray-800/80 text-gray-200 border-gray-700 hover:border-blue-400/50'
																	: 'bg-gray-50 text-gray-700 border-gray-200 hover:border-blue-400/50'
																	}`}
																initial={{ opacity: 0, scale: 0.8, rotateY: -45 }}
																whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
																viewport={{ once: true }}
																transition={{ delay: i * 0.08, type: "spring", stiffness: 200 }}
																whileHover={{
																	scale: 1.12,
																	y: -5,
																	rotateZ: i % 2 === 0 ? 3 : -3,
																	backgroundColor: darkMode ? '#3B82F6' : '#2563EB',
																	color: '#ffffff',
																	borderColor: darkMode ? '#60A5FA' : '#3B82F6',
																	boxShadow: darkMode
																		? '0 12px 30px rgba(59, 130, 246, 0.5)'
																		: '0 12px 30px rgba(37, 99, 235, 0.4)'
																}}
																whileTap={{ scale: 0.95 }}
						
															>
																{course}
															</motion.span>
														))}
													</div>
												</div>
											</div>
										</motion.div>
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
