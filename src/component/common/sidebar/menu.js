import React from 'react'
export const MENUITEMS = [
    {
        title: 'User Management', icon: <i className="pe-7s-user pe-lg"></i>, path: '/dashboard/user_management', type: 'sub',active: true,bookmark: true, children: [
                {title: 'Dashboard', type: 'sub'},
                { title: 'Default', type: 'link', path:  '/dashboard/user_management'}
        ]
    },
    {
        title: 'Channel Management', icon: <i className="pe-7s-edit"></i>,  path:  '/dashboard/channel_management', type: 'sub',active: false, children: [
                {title: 'Sample Page', type: 'sub'},
                { title: 'Sample Page', type: 'link', path:  '/dashboard/channel_management'},
        ]
    },
    {
        title: 'Video Management', icon: <i className="pe-7s-note2"></i>,  path: '/dashboard/video_management', type: 'sub',active: false, children: [
                {title: 'Ticket', type: 'sub'},
                { title: 'Raise Ticket', type: 'exteral_link', path: '/dashboard/video_management' },
        ]
        
    },
    {
        title: 'Parametre', icon: <i className="pe-7s-news-paper"></i>,  path: '/dashboard/parametre', type: 'sub',active: false, children: [
                {title: 'Ticket', type: 'sub'},
                { title: 'Raise Ticket', type: 'exteral_link', path: '/dashboard/parametre' },
        ]
        
    },
]