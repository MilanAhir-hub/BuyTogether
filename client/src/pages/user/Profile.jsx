import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Mail, Calendar, User, Shield, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { userService } from '../../services/userService';
import NavbarAuth from '../../sections/home/NavbarAuth';
import FooterSection from '../../sections/home/FooterSection';

export default function Profile() {
    const { data: userProfile, isLoading, isError, error } = useQuery({
        queryKey: ['userProfile'],
        queryFn: userService.getProfile,
    });

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
            <NavbarAuth />

            <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto">
                    {/* Header */}
                    <div className="mb-8 flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">My Profile</h1>
                            <p className="mt-2 text-sm text-gray-600 font-medium">Manage your account settings and preferences.</p>
                        </div>
                        <Link to="/home" className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 rounded-xl transition-colors">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Dashboard
                        </Link>
                    </div>

                    <div className="bg-white shadow-sm border border-gray-200 rounded-2xl overflow-hidden">
                        
                        {/* Status Views */}
                        {isLoading && (
                            <div className="p-12 text-center">
                                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
                                <p className="text-gray-500 font-medium">Loading profile details...</p>
                            </div>
                        )}

                        {isError && (
                            <div className="p-12 text-center bg-red-50">
                                <Shield className="mx-auto h-12 w-12 text-red-400 mb-4" />
                                <h3 className="text-lg font-bold text-red-800 mb-2">Error Loading Profile</h3>
                                <p className="text-red-600 mb-6">{error?.message || "Failed to load user data."}</p>
                                <button 
                                    onClick={() => window.location.reload()}
                                    className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-semibold shadow-sm hover:bg-red-700 transition"
                                >
                                    Try Again
                                </button>
                            </div>
                        )}

                        {/* Data View */}
                        {userProfile && !isLoading && !isError && (
                            <div>
                                {/* Avatar Banner */}
                                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-8 sm:p-10 text-center sm:text-left sm:flex sm:items-center sm:space-x-8">
                                    <div className="mx-auto sm:mx-0 h-24 w-24 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white text-3xl font-bold border-4 border-white/30 shadow-lg">
                                        {userProfile.username ? userProfile.username.charAt(0).toUpperCase() : 'U'}
                                    </div>
                                    <div className="mt-4 sm:mt-0 text-white">
                                        <h2 className="text-2xl font-bold">{userProfile.username}</h2>
                                        <p className="text-blue-100 font-medium mt-1">{userProfile.role} Member</p>
                                    </div>
                                </div>

                                {/* Details List */}
                                <div className="px-6 py-6 sm:px-10">
                                    <div className="space-y-6">
                                        
                                        <div className="flex items-center p-4 bg-gray-50 rounded-xl border border-gray-100">
                                            <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                                                <User className="h-5 w-5 text-blue-600" />
                                            </div>
                                            <div className="ml-4">
                                                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Full Name</p>
                                                <p className="text-lg font-medium text-gray-900">{userProfile.username}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center p-4 bg-gray-50 rounded-xl border border-gray-100">
                                            <div className="flex-shrink-0 h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center">
                                                <Mail className="h-5 w-5 text-indigo-600" />
                                            </div>
                                            <div className="ml-4">
                                                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Email Address</p>
                                                <p className="text-lg font-medium text-gray-900">{userProfile.email}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center p-4 bg-gray-50 rounded-xl border border-gray-100">
                                            <div className="flex-shrink-0 h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
                                                <Calendar className="h-5 w-5 text-green-600" />
                                            </div>
                                            <div className="ml-4">
                                                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Member Since</p>
                                                <p className="text-lg font-medium text-gray-900">
                                                    {new Date(userProfile.createdAt).toLocaleDateString('en-US', {
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric'
                                                    })}
                                                </p>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            <FooterSection />
        </div>
    );
}
